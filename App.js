import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight
} from '@viro-community/react-viro';


const InititalScene = (props)=>{

  const [rotation,setRotation] =useState([-45,50,40]);
  const [position,setPosition] =useState([0,0,-5]);
  const [tvScale,setTvScale] =useState([0.005,0.005,0.005]);
  const [skullScale,setSkullScale] =useState([0.05,0.05,0.05]);

  let data = props.sceneNavigator.viroAppProps;
  ViroMaterials.createMaterials({
    tv:{
      diffuseTexture:require('./assets/tv/Old_Tv/TV_Body_material_Base_Color.png')
    }
  })

  ViroAnimations.registerAnimations({
    rotate:{
      duration:2500,
      properties:{
        rotateY:'+=90'
      }
    }
  })

  // move objects on drag
  const moveObject = (newPosition) =>{
    setPosition(newPosition);
  }

  //rotate object
  const rotateObject = (rotateState, rotationFactor, source)=>{
    if(rotateState === 3){
      let newRotation = [rotation[0] - rotationFactor,rotation[1] - rotationFactor,rotation[2] - rotationFactor];
      setRotation(newRotation);
    }
  }


  // scale function
  const scaleSkullObject = (pinchState, scaleFactor, source)=>{
    if(pinchState === 3){
      let currentScale = skullScale[0];
      let newScale = currentScale*scaleFactor;
      let newScaleArray = [newScale,newScale,newScale];
      setSkullScale(newScaleArray);
    }

  }


  const scaleTvObject = (pinchState, scaleFactor, source)=>{
    if(pinchState === 3){
      let currentScale = tvScale[0];
      let newScale = currentScale*scaleFactor;
      let newScaleArray = [newScale,newScale,newScale];
      setTvScale(newScaleArray);
    }
  }

  return(
    <ViroARScene>
      <ViroAmbientLight color="#ffffff"/>
      {data.object === "skull"?
            <Viro3DObject
              source={require('./assets/skull/12140_Skull_v3_L2.obj')}
              position={position}
              scale={skullScale}
              rotation={rotation}
              type="OBJ"
              onDrag={moveObject}
              onRotate={rotateObject}
              onPinch={scaleSkullObject}
            />
            :
            <Viro3DObject
              source={require('./assets/tv/Old_Tv/Old_Tv.obj')}
              position={position}
              scale={tvScale}
              rotation={rotation}
              materials={["tv"]}
              type="OBJ"
              onDrag={moveObject}
              onRotate={rotateObject}
              onPinch={scaleTvObject}
            />

      }

    </ViroARScene>
  )
}

export default () => {
  const [object,setObject] = useState('tv');
  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene:InititalScene
        }}
        viroAppProps={{"object":object}}
        style={{flex:1}}
      />
      <View style={styles.controlsView}>
          <TouchableOpacity onPress={()=>setObject('skull')}>
            <Text style={styles.text}>Display Skull</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>setObject('tv')}>
            <Text style={styles.text}>Display TV</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView:{
    flex:1
  },
  controlsView:{
    width:'100%',
    height:100,
    backgroundColor:'#ffffff',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text:{
    margin:20,
    backgroundColor:'#9d9d9d',
    padding:10,
    fontWeight:'bold'
  }
});
