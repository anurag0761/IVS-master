import React, { useState } from 'react';
import { Button, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import TopBarWithLogoComponent from "../components/topbarWithLogoAndLogoutBtn";

const DocPicker = ({ navigation }) => {
	const [doc, setDoc] = useState();
	const [backDoc, setBackDoc] = useState();
	// const [passportData, setPassportData] = useState();
	let docType = '';
	const [buttonText, setButtonText] = useState('Next');

	switch (navigation.getParam('docType')) {
		case 'ksa':
			docType = 'KSA Passport';
			break;
		case 'usa':
			docType = 'USA Passport';
			break;
		case 'uk':
			docType = 'UK Passport';
			break;
		case 'neomId':
			docType = 'NEOM ID';
			break;
		case 'iqamaCard':
			docType = 'Iqama Card';
			break;
	}


	const pickDocument = async (docType) => {
		DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
			if (response.type == 'success') {
				let { name, size, uri } = response;
				let nameParts = name.split('.');
				let fileType = nameParts[nameParts.length - 1];
				var fileToUpload = {
					name: name,
					size: size,
					uri: uri
				};
				console.log(fileToUpload, '...............file')
				if (docType.toLowerCase() === 'front') setDoc(fileToUpload);
				else setBackDoc(fileToUpload);
			}
		});
		// console.log("Doc: " + doc.uri);
	}

	// const docSelector = <TouchableOpacity onPress={this.pickDocument} >
	// 	<View style={styles.ellipse}>
	// 		<Image style={styles.addIcon} source={require('../../assets/upload_passport/add2x.png')} />
	// 	</View>
	// 	<Text style={styles.selectDocumentText}>Front Page</Text>
	// </TouchableOpacity>;

	const postDocument = async () => {
		// console.log('doc = ', JSON.stringify(doc));
		const url = "http://10.101.21.16/documentsAPI/extractDocuments";
		const formData = new FormData();
		const myHeaders = new Headers();
		myHeaders.append("x-access-token", "AEF2ABBA30E147A78E6270F53354EBA733EFF6586E9A4707BE2C54B71379CD5F");
		myHeaders.append('Content-Type', 'multipart/form-data');

		// const documentData = await fetch(doc.uri).then(response => response.blob());
		// const backDocumentData = await fetch(backDoc.uri).then(response => response.blob());
		// console.log('documentData = ');
		formData.append('type', docType);
		// formData.append("documents", doc);
		// formData.append("type", "Passport");
		formData.append("front", doc);
		formData.append("back", backDoc);
		// formData.append("authBridgeID", "mudittest" + Math.floor(Math.random() * 999999));
		// formData.append("singleDoc", "Yes");
		formData.append('expectedAccuracy', 'High Accuracy');
		formData.append('validationCriteria[0]', 'Data Visibility');
		formData.append('validationCriteria[1]', 'Image Quality');

		const options = {
			method: 'POST',
			headers: myHeaders,
			body: formData,
			redirect: 'follow'
		};

		setButtonText('Processing...');
		console.log(JSON.stringify(options));
		fetch(url, options).then(async (response) => {
			console.log('response came = ', JSON.stringify(response));
			response.json().then(function (data) {
				// setPassportData(data);
				console.log(' sent data ============ ', data);
				setTimeout(() => {
					navigation.navigate('PassportDetails', {
						data,
						docType
					});
					setButtonText('Next');
				}, 0); 
				// console.log('request succeeded with JSON response', passportData);
			})
			// .then(() => {
			// 	navigation.navigate('PassportDetails', {
			// 		data: passportData
			// 	});
			// })
			.catch(function (error) {
				console.log('Data failed', error)
			});
		}).catch((error) => {
			console.log('response error = ', error);
		});
	}

	const getUri = (doc) => {
		console.log('==============1===============');
		return doc && doc.uri ? doc.uri : null;
	}

	return (
		<View style={styles.container}>
			<TopBarWithLogoComponent />

			<View style={{ position: 'absolute', top: 100.5 }}>
				<Text style={styles.selectedIdText}>{docType}</Text>
				<Text style={styles.addPassportText}>Add photo of your passport</Text>
			</View>

			<View style={{ position: 'absolute', flexDirection: 'row', top: 181.5 }}>
				<TouchableOpacity style={styles.selectDocument} onPress={() => pickDocument('front')} >
					<View style={styles.ellipse}>
						<Image style={styles.addIcon} source={require('../../assets/upload_passport/add2x.png')} />
					</View>
					<Text style={styles.selectDocumentText}>Front Page</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.selectBackDocument} onPress={() => pickDocument('back')} >
					<View style={styles.ellipse}>
						<Image style={styles.addIcon} source={require('../../assets/upload_passport/add2x.png')} />
					</View>
					<Text style={styles.selectDocumentText}>Back Page</Text>
				</TouchableOpacity>
			</View>

			<View style={{ position: 'absolute', flexDirection: 'row' }}>
				<Image style={{ left: 30, width: 10, height: 10, top: 287.5 }} source={require('../../assets/upload_passport/tickGreen2x.png')} />
				<Text style={styles.approvedText}>Approved</Text>
			</View>

			<Image
				style={{ width: 96, height: 96, top: 133.5, left: 90 }}
				source={{ uri: getUri(doc) }}
			/>

			<Image
				style={{ width: 96, height: 96, top: 36.5, left: 255 }}
				source={{ uri: getUri(backDoc) }}
			/>

			<View style={styles.instructionBlock}>
				<Text style={styles.instructionHeading}>Instructions to click a good photo</Text>
				<View style={styles.instructionView}>
					<Text style={styles.instructions}>• Working camera with decent internet connection</Text>

					<Text style={styles.instructions}>• Entire ID fits inside the frame and is well lit</Text>

					<Text style={styles.instructions}>• Size of the file is 5 MB</Text>

					<Text style={styles.instructions}>• Document is placed flat on a clean surface</Text>

					<Text style={styles.instructions}>• Image is clearly readable</Text>

					<Text style={styles.instructions}>• There should be no 3D skew in the image</Text>

					<Text style={styles.instructions}>• Vertical rotation should not be more than 45{'\u00b0'}.
						90{'\u00b0'}, 180{'\u00b0'} and 270{'\u00b0'} rotations are acceptable</Text>

					<Text style={styles.instructions}>• There are no flash, unnatural shadows or other
						objects covering the document</Text>
				</View>
			</View>

			<TouchableOpacity style={styles.nextBtn} onPress={postDocument} >
				<Text style={styles.nextText}>{buttonText}</Text>
			</TouchableOpacity>

		</View>
	)
};

const styles = StyleSheet.create({
	container: {
		width: 375,
		height: 720,
		backgroundColor: "#ffffff",
		flexDirection: "column",

	},
	selectedIdText: {
		// width: 187,
		height: 28.5,
		fontFamily: "PoppinsMedium",
		fontSize: 24,
		fontWeight: "500",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
		// top: 100.5,
		left: 30
	},
	addPassportText: {
		width: 260,
		height: 16.5,
		fontFamily: "PoppinsRegular",
		fontSize: 13,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
		top: 7.5,
		left: 30
	},

	//=============================//
	selectDocument: {
		width: 148.5,
		height: 96,
		borderRadius: 5,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#e6e6e6",
		// top: 181.5,
		left: 30
	},
	selectBackDocument: {
		width: 148.5,
		height: 96,
		borderRadius: 5,
		backgroundColor: "#ffffff",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "#e6e6e6",
		// top: 181.5,
		left: 48
	},
	ellipse: {
		width: 36,
		height: 36,
		backgroundColor: "#ffd956",
		borderRadius: 18,
		left: 20,
		top: 15
	},
	addIcon: {
		width: 14,
		height: 18,
		// backgroundColor: "#000000"
		top: 9,
		left: 11
	},
	selectDocumentText: {
		fontFamily: 'PoppinsRegular',
		top: 30,
		left: 20
	},

	approvedText: {
		left: 35,
		top: 286,
		width: 53.5,
		height: 13.5,
		fontFamily: "PoppinsRegular",
		fontSize: 11,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#28b351"
	},
	tinyLogo: {
		width: 50,
		height: 50,
	},

	//=============================//


	instructionBlock: {
		width: 375,
		height: 393,
		position: 'absolute',
		top: 327,
		backgroundColor: "#f9f7f2",
		flexDirection: 'column'
	},
	instructionHeading: {
		width: 277,
		height: 20,
		fontFamily: "PoppinsMedium",
		fontSize: 14,
		fontWeight: "500",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
		top: 30,
		left: 30
	},
	instructionView: {
		height: 205,
		top: 46,
		left: 30,
		justifyContent: "space-between",
	},
	instructions: {
		width: 300,
		fontFamily: "PoppinsMedium",
		fontSize: 12,
		fontWeight: "normal",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "left",
		color: "#000000",
		top: 10
	},

	nextBtn: {
		width: 315,
		height: 57,
		position: "absolute",
		borderRadius: 10,
		backgroundColor: "#b89535",
		left: 30,
		top: 620.5
		// marginTop: '84.9%',
	},
	nextText: {
		// width: 27.5,
		// height: 9.5,
		fontFamily: "PoppinsMedium",
		fontSize: 13,
		fontWeight: "500",
		fontStyle: "normal",
		letterSpacing: 0,
		textAlign: "center",
		color: "#ffffff",
		top: 18
	}
	// logo: {
	//   width: 150,
	//   height: 150,
	// },
});

export default DocPicker;