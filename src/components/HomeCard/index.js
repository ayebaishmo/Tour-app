import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {primaryColor} from '../../helpers';

const HomeCard = ({name, icon}) => {
  const iconColor = 'white';
  const iconSize = 24;

  return (
    <View style={{
      backgroundColor: `${primaryColor}`,
      width: 155,
      margin: 2,
      borderRadius: 4,
      
    }}>

      <View style={{
          paddingTop: 14,
          paddingBottom: 14,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
      }}>

        <Ionicons name={icon} size={iconSize} color={iconColor} />
        <Text style={{
          textAlign: 'center',         
          color: 'white',
          fontSize: 20,
          marginStart: 8,
        }}>
          {name}
        </Text>

      </View>
        
    </View>
  )
}

HomeCard.propTypes = {

}

export default HomeCard
