import React from 'react';
import {
  Animated,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

export class ItemCard extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    picture: PropTypes.any.isRequired,
    selected: PropTypes.bool,
    height: PropTypes.number,
    maxHeight: PropTypes.number,
    onPress: PropTypes.func,
    onLayout: PropTypes.func,
    onClose: PropTypes.func,

    activeOpacity: PropTypes.number,

    shrinkTo: PropTypes.number,
    shrinkDuration: PropTypes.number,
    heightDuration: PropTypes.number,

    borderRadius: PropTypes.number,

    textStyle: PropTypes.any,

    closeIcon: PropTypes.element,

    content: PropTypes.element
  }

  constructor(props) {
    super(props);

    this.state = {
      heightAnim: new Animated.Value(this.props.height || 200),
      scaleAnim: new Animated.Value(1),
      selected: this.props.selected
    }    

  }

  _onPresIn = () => {

    if (this.props.selected) {
      return;
    }

    Animated.timing(this.state.scaleAnim, {
      toValue: this.props.shrinkTo || 0.96,
      duration: this.props.shrinkDuration || 200,
    }).start()
  }

  _onPressOut = () => {

    if (this.props.selected) {
      return;
    }

    Animated.timing(this.state.scaleAnim, {
      toValue: 1,
      duration: this.props.shrinkDuration || 200,
    }).start()
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.selected && !this.props.selected) {
      Animated.timing(this.state.heightAnim, {
        toValue: nextProps.maxHeight || 400,
        duration: nextProps.heightDuration || 260
      }).start()
    }

    if (!nextProps.selected && this.props.selected) {
      Animated.timing(this.state.heightAnim, {
        toValue: nextProps.height || 200,
        duration: nextProps.heightDuration || 260
      }).start()
    }

  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity || 0.8}
        onPressIn={this._onPresIn}
        onPressOut={this._onPressOut}
        onPress={this.props.onPress}
      >

        <Animated.View
          style={[
            styles.container,
            this.props.style,
            this.props.borderRadius ? { borderRadius: this.props.borderRadius } : {},
            {
              transform: [{ scale: this.state.scaleAnim }],
              height: this.state.heightAnim
            }
          ]}>

          <ImageBackground
            onLayout={this.props.onLayout}
            borderRadius={this.props.selected ? 0 : (this.props.borderRadius || 10)}
            source={this.props.picture}
            style={[
              styles.image,
              { height: this.props.height || 200 }
            ]}
          >
            <Text style={[styles.text, this.props.textStyle]}>
              {this.props.title}
            </Text>
            {
              this.props.selected ?
                <TouchableWithoutFeedback onPress={this.props.onClose} >
                  <View style={{
                    position: 'absolute',
                    top: 26,
                    right: 26
                  }}>
                    {this.props.closeIcon || <Text>X</Text>}
                  </View>  
                </TouchableWithoutFeedback> : null
            }
          </ImageBackground>

          {
            this.props.selected ?
              <View style={{flex: 1, padding: 20}}>
                {this.props.content || <Text>COntent!</Text>}
              </View> : null
          }
        </Animated.View>
      </TouchableOpacity>
    )
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(240, 240, 240)',    
    margin: 20,
    padding: 0
  },
  image: {
    width: undefined,
    height: 200,
    padding: 20,
    margin: 0,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    fontWeight: '700',
    fontSize: 44
  }

});