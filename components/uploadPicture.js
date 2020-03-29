import * as React from 'react';
import { Button, Image, View,TouchableOpacity,Text,StyleSheet,Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
const screenWidth = Math.round(Dimensions.get('window').width);
export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    images:'',
    LocalImage:[],
    image_name:'',
    image_url:'',
    multipleUrl:[]
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
  

    _takePhoto = async () => {
          const {
            status: cameraPerm
          } = await Permissions.askAsync(Permissions.CAMERA);

          const {
            status: cameraRollPerm
          } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

          // only if user allows permission to camera AND camera roll
          if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
              base64: true,
              allowsEditing: true,
              aspect: [4, 3],
            });

            if (!pickerResult.cancelled) {
              let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
              this.state.multipleUrl.push(imageUri)
              
            this.setState({
              LocalImage: this.state.LocalImage.concat([pickerResult.uri]),
            })
            }
          }
      }

   _maybeRenderImage = () => {
        let {
          image
        } = this.state;

        if (!image) {
          return;
        }
  }

    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
              <ActivityIndicator color="#fff" size="large" />
            </View>
          );
        }
  };


  _pickImage = async () => {
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
            allowsEditing: true,
            aspect: [4, 3],
          })
          let imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null;
          imageUri && {uri: imageUri};
            this.state.multipleUrl.push(imageUri)
            //this.state.LocalImage.push(pickerResult.uri)
            
            this.setState({
              LocalImage: this.state.LocalImage.concat([pickerResult.uri]),
          })
      }

 
  _renderImages() {
    let images = [];
      this.state.LocalImage.map((item, index) => {
      images.push(
        <Image
          key={index}
          source={{ uri: item }}
          style={{ width: 100, height: 100 }}
        />
      )
    })
   return images;
  }

  render() { 
        return (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Button title="Pick an image from camera roll" onPress={this._pickImage}/>
                      
                      <View style={{ margin:10}}>
                        <Button onPress={this._takePhoto} title="Take a photo" />
                      </View>
                      
                      <View style={styles.containers}>
                          {this._renderImages()}
                      </View>
                      
                      <View style={{fontSize:20,	backgroundColor:'#08a188',	borderRadius:0,	color: '#fff',	width:'100%',	paddingTop: 12,	paddingBottom: 12,textAlign:'center', position:'absolute', bottom:0, left:0}}> 
                          <TouchableOpacity>
                              <Text style={{textAlign:"center", color:'#ffffff', fontSize:20,}}>Done</Text>
                          </TouchableOpacity>
                      </View>
              </View>
        )
      }
  }


const styles=StyleSheet.create({
	
  top_header: {
    backgroundColor: "#099898",
    padding:10,
    flexDirection: 'row',
  },
  containers: {
    flexDirection:"row",
    backgroundColor: '#ffffff',
   // alignItems: 'center',
    //justifyContent: 'center',
  },
  nav_icon: {
		marginTop:10,
		marginBottom:5,
  },
  headingtext: {
    textAlign:"left", color:'#ffffff', fontSize:20
  },
  category_text_col: {
    fontSize: 18,
    color: '#ffffff'
},
category_col: {
  flexDirection: 'row',
marginTop:15,
marginBottom:15
},
maybeRenderUploading: {
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
},
})
