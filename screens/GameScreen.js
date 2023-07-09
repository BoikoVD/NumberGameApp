import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Title from '../components/generalUi/Title';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/generalUi/PrimaryButton';
import Card from '../components/generalUi/Card';
import InstructionText from '../components/generalUi/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
 
	if (rndNum === exclude) {
	  return generateRandomBetween(min, max, exclude);
	} else {
	  return rndNum;
	}
};

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {
	const initialGuess = generateRandomBetween(1, 100, userNumber);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [rounds, setRounds] = useState([initialGuess]);

	const { width, height } = useWindowDimensions();

	function nextGuessHandler(direction) {
		if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
			Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }]);
			return;
		};

		if (direction === 'lower') {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		};
		const newGuessNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
		setCurrentGuess(newGuessNum);
		setRounds((prev) => [newGuessNum, ...prev]);
	};

	const guessRoundsLength = rounds.length;

	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver(rounds.length);
		}
	}, [currentGuess, onGameOver, userNumber]);

	useEffect(() => {
		minBoundary = 1;
		maxBoundary = 100;
	}, []);

	let content = (<>
		<NumberContainer>{currentGuess}</NumberContainer>
		<Card>
			<InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name='md-remove' size={24} color='white'/>
					</PrimaryButton>
				</View>
				<View style={styles.buttonContainer}>
					<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name='md-add' size={24} color='white'/>
					</PrimaryButton>
				</View>
			</View>
		</Card>
	</>);

	if (width > 500) {
		content = (
			<>
				<View style={styles.buttonsContainerWide}>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
							<Ionicons name='md-remove' size={24} color='white'/>
						</PrimaryButton>
					</View>
					<NumberContainer>{currentGuess}</NumberContainer>
					<View style={styles.buttonContainer}>
						<PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
							<Ionicons name='md-add' size={24} color='white'/>
						</PrimaryButton>
					</View>
				</View>
			</>
		);
	}

  	return (
		<View style={styles.screen}>
		  	<Title>Opponent's Guess</Title>
			{content}
			<View style={styles.listContainer}>
				<FlatList
					data={rounds}
					renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsLength - itemData.index} guessNumber={itemData.item} />}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
  	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 24,
		marginTop: 100,
		alignItems: 'center'
	},
	instructionText: {
		marginBottom: 12
	},
	buttonsContainer: {
		flexDirection: 'row',
	},
	buttonsContainerWide: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	buttonContainer: {
		flex: 1,
	},
	listContainer: {
		flex: 1,
		padding: 16,
	}
});