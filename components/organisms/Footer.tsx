import { View, StyleSheet } from "react-native";
import LinkButton from "../molecules/LinkButton";
import { ExerciseIcon, UserIcon, NewWorkoutIcon } from "../atoms/icons"; 

export default function Footer() {
  
    return (
    
        <View style={styles.footer}>

            <LinkButton 
                text="Exercises" 
                href="/exercises" 
                icon={<ExerciseIcon />} 
                styleButton={{flexDirection: 'column', marginLeft: 30, }}
                styleLink={{color: 'white', marginTop: 3, fontSize: 12,}} 
            />

            <LinkButton 
                text="New Workout" 
                href="/new-workout" 
                icon={<NewWorkoutIcon />} 
                styleButton={{flexDirection: 'column',}}
                styleLink={styles.link}
            />

            <LinkButton 
                text="Profile" 
                href="/profile" 
                icon={<UserIcon />} 
                styleButton={{flexDirection: 'column', marginRight:30}}
                styleLink={styles.link}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        backgroundColor: '#171328',
    },

    link: {
        color: 'white',
        marginTop: 6,
        fontSize: 12,
        marginLeft:-5
    },
});
