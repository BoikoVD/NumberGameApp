import { Image, StyleSheet, Text, View, Dimensions, useWindowDimensions, ScrollView } from 'react-native';
import Title from '../components/generalUi/Title';
import Colors from '../util/colors';
import PrimaryButton from '../components/generalUi/PrimaryButton';

export default function GameOverScreen({ rounds, userNumber, onRestart }) {
	const { width, height } = useWindowDimensions();

	let imageSize = 300;

	if (width < 300) {
		imageSize = 150;
	};

	if (height < 400) {
		imageSize = 80;
	};

	const imageStyle = {
		width: imageSize,
		height : imageSize,
		borderRadius: imageSize / 2,
	}

  	return (
		<ScrollView style={styles.screen}>
			<View style={styles.rootContainer}>
				<Title>GAME OVER!</Title>
				<View style={[styles.imageContainer, imageStyle]}>
					<Image source={require('../assets/success.png')} style={styles.image}/>
				</View>
				<Text style={styles.summaryText}>
					Your phone needed <Text style={styles.highlight}>{rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
				</Text>
				<PrimaryButton onPress={onRestart}>
					Start New Game
				</PrimaryButton>
			</View>
		</ScrollView>
  	);
};

// const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	rootContainer: {
		flex: 1,
		padding: 24,
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageContainer: {
		// borderRadius: deviceWidth < 380 ? 75 : 100,
		// width: deviceWidth < 380 ? 150 : 200,
		// height: deviceWidth < 380 ? 150 : 200,
		borderWidth: 3,
		borderColor: Colors.primary800,
		overflow: 'hidden',
		margin: 36,
	},
	image: {
		width: '100%', 
		height: '100%',
	},
	summaryText: {
		fontFamily: 'open-sans',
		fontSize: 24,
		textAlign: 'center',
		marginBottom: 24,
	},
	highlight: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary500
	}
});