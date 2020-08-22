import React, { useState }  from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect }   from '@react-navigation/native';
import AsyncStorage         from '@react-native-community/async-storage';

import styles from './styles';

import PageHeader               from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favorites() {
    const [ favorites, setFavorites ] = useState([]);

    async function loadFavorites() {
        const response = await AsyncStorage.getItem('favorites');
        let favoritesArray = [];
        if (response) {
            favoritesArray = JSON.parse(response);
            setFavorites(favoritesArray);
        }
    }

    useFocusEffect(() => {
        loadFavorites()
    });

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                }}
            >
                {favorites.map((teacher: Teacher, index) => {
                    return (
                        <TeacherItem
                            key={`${teacher.id}_${index}`}
                            teacher={teacher}
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Favorites;