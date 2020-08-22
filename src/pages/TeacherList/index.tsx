import React, { useState, useEffect }        from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton }      from 'react-native-gesture-handler';
import { Feather }                           from '@expo/vector-icons';
import AsyncStorage                          from '@react-native-community/async-storage';

import api    from '../../services/api';
import styles from './styles';

import PageHeader               from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function TeacherList() {
    const [ isFilterVisible, setIsFilterVisible ] = useState(false);
    const [ subject, setSubject ] = useState('');
    const [ weekDay, setWeekDay ] = useState('');
    const [ time, setTime ] = useState('');

    const [ teachers, setTeachers ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);

    function handleToggleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function filterTeachers() {
        const { data } = await api.get('classes', {
            params: {
                subject:  subject,
                week_day: weekDay,
                time:     time,
            }
        })

        setIsFilterVisible(false);
        setTeachers(data);
    }

    async function getFavorites() {
        const response = await AsyncStorage.getItem('favorites')
        if (response && typeof(response) == "string") {
            const favoritedTeachers = JSON.parse(response);
            const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                return teacher.id;
            });

            setFavorites(favoritedTeachersId);
        }
    }

    useEffect(() => {
        getFavorites()
        filterTeachers();
    }, []);

    function handleSubmit() {
        getFavorites()
        filterTeachers();
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
            { isFilterVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={ text => { setSubject(text) }}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#C1BCCC"
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={weekDay}
                                onChangeText={ text => { setWeekDay(text) }}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#C1BCCC"
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={ text => { setTime(text) }}
                                placeholder="Qual horário?"
                                placeholderTextColor="#C1BCCC"
                            />
                        </View>
                    </View>

                    <RectButton
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
            )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                }}
            >
                {teachers.map((teacher: Teacher, index) => {
                    return (
                        <TeacherItem
                            key={teacher.name + "_" + index}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;