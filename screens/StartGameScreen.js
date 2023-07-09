import { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import PrimaryButton from '../components/generalUi/PrimaryButton';
import Colors from '../util/colors';
import Title from '../components/generalUi/Title';
import Card from '../components/generalUi/Card';
import InstructionText from '../components/generalUi/InstructionText';

export default function StartGameScreen({ onSetNumber }) {
	const [number, setNumber] = useState('');

	const { width, height } = useWindowDimensions();

	const inputHandler = (value) => {
		setNumber(value);
	};

	const resetHandler = () => {
		setNumber('');
	};

	const confirmHandler = () => {
		const choosenNumber = parseInt(number);

		if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
			Alert.alert('Invalid number', 'Number has to be a number between 1 and 99', [{ text: 'Ok', style: 'destructive', onPress: resetHandler }]);
			return;
		};

		onSetNumber(choosenNumber);
	};

	const marginTopDistance = height < 380 ? 30 : 100;

	return (
		<ScrollView style={styles.screen} >
			<KeyboardAvoidingView style={styles.screen} behavior='position'>
				<View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
					<Title>Guess my number</Title>
					<Card>
						<InstructionText>
							Enter a number
						</InstructionText>
						<TextInput
							style={styles.input}
							maxLength={2}
							keyboardType='number-pad'
							autoCapitalize='none'
							autoCorrect={false}
							value={number}
							onChangeText={inputHandler}
						/>
						<View style={styles.buttonsContainer}>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
							</View>
							<View style={styles.buttonContainer}>
								<PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
							</View>
						</View>
					</Card>
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};


const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	rootContainer: {
		flex: 1,
		alignItems: 'center'
	},
	input: {
		height: 50,
		width: 50,
		marginVertical: 8,
		borderBottomColor: Colors.accent500,
		borderBottomWidth: 2,
		fontSize: 32,
		color: Colors.accent500,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonContainer: {
		flex: 1,
	}
});