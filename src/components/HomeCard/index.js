import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import {primaryColor} from '../../helpers';

const HomeCard = ({name, icon, onPressed}) => {
  const iconColor = 'white';
  const iconSize = 24;

  return (
    <Button
      icon={
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{marginEnd: 10}}
        />
      }
      buttonStyle={{
        width: Dimensions.get('window').width / 2.2,
        backgroundColor: `${primaryColor}`,
        borderRadius: 12, 
        alignSelf: 'center',  
        padding: 12
      }}
      titleStyle={{fontSize: 20}}
      containerStyle={{margin: 3}}
      title={name}
      onPress={onPressed}
    />
  )
}

HomeCard.propTypes = {
  onPressed: PropTypes.func,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default HomeCard
