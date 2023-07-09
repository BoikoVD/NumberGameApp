import { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import Colors from './util/colors';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [userNumber, setUserNumber] = useState();
	const [gameIsOver, setGameIsOver] = useState(false);
	const [guessRounds, setGuessRounds] = useState(0);
	
	const [fontsLoaded] = useFonts({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	const numberHandler = (number) => {
		setUserNumber(number);
	};

	const gameOverHandler = (rounds) => {
		setGameIsOver(true);
		setGuessRounds(rounds);
	};

	const restartHandler = () => {
		setUserNumber(null);
		setGameIsOver(false);
		setGuessRounds(0);
	};

	let screen = <StartGameScreen onSetNumber={numberHandler} />

	if (userNumber) {
		screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
	}

	if (gameIsOver) {
		screen = <GameOverScreen rounds={guessRounds} userNumber={userNumber} onRestart={restartHandler}/>
	}

  return (
	<>
		<StatusBar style='light'/>
		<LinearGradient style={styles.rootScreen} colors={[Colors.primary700, Colors.accent500]} onLayout={onLayoutRootView}>
			<ImageBackground source={require('./assets/background.png')} resizeMode='cover' style={styles.rootScreen} imageStyle={styles.bgImage}>
				<SafeAreaView style={styles.rootScreen}>
					{screen}
				</SafeAreaView>
			</ImageBackground>
		</LinearGradient>
	</>
  );
};

const styles = StyleSheet.create({
	rootScreen: {
		flex: 1,
	},
	bgImage: {
		opacity: 0.15,
	}
});
