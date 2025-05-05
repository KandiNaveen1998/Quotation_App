import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { baseUrl } from '../utils/API/endpoints';

type DropdownItem = {
    label: string;
    value: string | number;
};

type Props = {
    value: string | number | null;
    onSelect: (value: string | number) => void;
    onSearchTextChange: (text: string) => void;
    data: DropdownItem[];
    loading: boolean;
};

const SearchableApiDropdown: React.FC<Props> = ({ value, onSelect }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [dropdownData, setDropdownData] = useState<DropdownItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchDropdownData = debounce(async (query: string) => {
        if (!query) { return; }

        setLoading(true);
        try {
            console.log('searched text', encodeURIComponent(query));
            // {{base_url}}/party?page=1&limit=1&searchKey=sha&partyType=financer
            let url = `${baseUrl}/party?page=1&limit=1&searchKey=${encodeURIComponent(query)}&partyType=financer`;
            // const url = `https://your-api.com/search?query=${encodeURIComponent(query)}`;
            const response = await axios.get<DropdownItem[]>(url);
            setDropdownData(response.data);
            console.log('API response:', response.data);




        } catch (error) {
            console.error('API error:', error);
            setDropdownData([]);
        } finally {
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        fetchDropdownData(searchText);
        return () => {
            fetchDropdownData.cancel();
        };
    }, [searchText]);

    return (
        <View style={styles.container}>
            <Dropdown
                style={styles.dropdown}
                placeholder="Search and select"
                search
                searchPlaceholder="Type to search..."
                data={dropdownData}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item: DropdownItem) => onSelect(item.value)}
                onChangeText={(text: string) => setSearchText(text)}
                renderRightIcon={() =>
                    loading ? <ActivityIndicator size="small" /> : null
                }
            />
        </View>
    );
};

export default SearchableApiDropdown;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        width: 200,
    },
});
