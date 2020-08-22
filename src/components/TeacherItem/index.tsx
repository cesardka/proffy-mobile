import React    from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styles   from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://github.com/cesardka.png' }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Cesar Hoffmann</Text>
                    <Text style={styles.subject}>Artes</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                A part of me, apart from me
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço / Hora {'   '}
                    <Text style={styles.priceValue}>
                        R$ 12,00
                    </Text>
                </Text>

                <View style={styles.buttonContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/* <Image source={heartOutlineIcon} /> */}
                        <Image source={unfavoriteIcon} />
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>

        </View>
    )
}

export default TeacherItem;