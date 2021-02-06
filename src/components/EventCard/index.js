import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import {primaryColor} from '../../helpers';

const EventCard = ({name, onPressed}) => {

  return (
    <Button
      buttonStyle={{
        width: Dimensions.get('window').width / 2.8,
        backgroundColor: `${primaryColor}`,
        borderRadius: 12, 
        alignSelf: 'center',  
        padding: 12
      }}
      titleStyle={{fontSize: 10}}
      containerStyle={{margin: 3}}
      title={name}
      onPress={onPressed}
    />
  )
}

EventCard.propTypes = {
  onPressed: PropTypes.func,
  name: PropTypes.string.isRequired,
}

export default EventCard
