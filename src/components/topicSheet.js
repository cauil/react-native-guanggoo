'use strict';

import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#ffffff',
	},
	header: {
		flexDirection: 'row',
		backgroundColor: '#f5f5f5',
		borderColor: '#e9e9e9',
		borderBottomWidth: 1,
		padding: 5,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'left'
	},
	info: {
		fontSize: 12,
		color: '#666666',
		textAlign: 'left',
		marginTop: 5,
	},
	avatar: {
		width: 50,
		height: 50,
		marginLeft: 5,
		borderRadius: 4
	},
	content_img: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
	},
	content_emoji: {
        width: 20,
        height: 20,
        marginLeft: 10,
        resizeMode: 'contain',
	},
	contentWrapper: {
        display: 'flex',
		borderBottomWidth: 1,
		borderColor: '#cccccc',
	},
	content: {
        flex: 1,
		fontSize: 14,
		color: '#666666',
		padding: 10,
	},
	node_name: {
		backgroundColor: '#f5f5f5',
		color: '#778087',
		marginRight: 5
	},
	user: {
		color: '#666666',
		marginRight: 5,
		marginLeft: 5
	},
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
