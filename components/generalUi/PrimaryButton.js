import { StyleSheet, View, Text, Pressable } from 'react-native';
import Colors from '../../util/colors';

export default function PrimaryButton({ children, onPress }) {
	const pressHandler = () => {
		onPress();
	};

  	return (
		<View style={styles.buttonOuterContainer}>
		  	<Pressable
				onPress={pressHandler}
				android_ripple={{ color: Colors.primary600 }}
				style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
			>
				<Text style={styles.text}>
					{children}
				</Text>
			</Pressable>
		</View>
  	);
}

const styles = StyleSheet.create({
	buttonOuterContainer: {
		borderRadius: 28,
		margin: 4,
		overflow: 'hidden',
  	},
	buttonInnerContainer: {
		backgroundColor: Colors.primary500,
		paddingVertical: 8,
		paddingHorizontal: 16,
		elevation: 2,
	},
	text: {
		color: 'white',
		textAlign: 'center'
	},
	pressed: {
		opacity: 0.75,
	}
});