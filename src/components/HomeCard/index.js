import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native';
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
      buttonStyle={{width: 155, backgroundColor: `${primaryColor}`, alignSelf: 'center',  padding: 12}}
      titleStyle={{fontSize: 20}}
      containerStyle={{margin: 3}}
      title={name}
      onPress={onPressed}
    />
  )
}

HomeCard.propTypes = {

}

export default HomeCard
