import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import FormInput from '../reusableComponents/FormInputText';
// import { modulesDataOfSettings } from '../utils/extra/SettingsData';
import { OutputGroup } from '../utils/helpers/settingsMethods';

interface ModulesProps {
    modulesDataOfSettings?: OutputGroup[];
}
// export default function Modules({ modulesDataOfSettings: OutputGroup[] = [] }) {
export default function Modules({ modulesDataOfSettings = [] }: ModulesProps) {


    console.log('modulesDataOfSettings in childre', modulesDataOfSettings);
    // const {
    //     control,
    //     handleSubmit,
    //     setValue,
    //     formState: { errors },
    //     trigger,
    //     reset,
    //     getValues,
    // } = useForm({
    // });
    const methods = useForm();

    // const handleInputChange = (e: any, name: string) => {
    //     setValue(name, e.nativeEvent.text);
    //     trigger(name); // Trigger validation for the specific field
    // };
    // function getModuleByPrefix(modules: OutputGroup[], prefix: string): OutputGroup | undefined {
    //     return modules.find(item => item.header.Key.startsWith(prefix));
    // }
    // Usage
    // const partyModule = getModuleByPrefix(modulesDataOfSettings, 'party');
    // const vehicleModule = getModuleByPrefix(modulesDataOfSettings, 'vehicle');
    // const approvalStatusModule = getModuleByPrefix(modulesDataOfSettings, 'approvalStatus');

    // const partyModule: OutputGroup = modulesDataOfSettings.find(item => item.header.Key.startsWith('party'));
    // const vehicleModule: OutputGroup = modulesDataOfSettings.find(item => item.header.Key.startsWith('vehicle'));
    // const approvalStatusModule: OutputGroup = modulesDataOfSettings.find(item => item.header.Key.startsWith('approvalStatus'));
    return (
        <View >
            {/* <Text >Modules</Text> */}
            {/* <Text >Manage your modules here</Text> */}
            <FormProvider {...methods}>
                {
                    modulesDataOfSettings?.map((item: any, index: number) => {
                        return (
                            <>
                                <View key={index}>
                                    {/* {console.log('realData', realData) || null} */}
                                    <Block data={item} />
                                </View>
                            </>
                        );
                    })
                }
            </FormProvider>
        </View>

    );
}

const styles = StyleSheet.create({
    blockContainer: {
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    blockTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
});



type BlockProps = {
    data: OutputGroup;
};

const Block = ({ data }: BlockProps) => {
    const { control } = useFormContext();

    const handleInputChange = (e: any, name: string) => {
        console.log('name', name);
        console.log('e', e);
        // setValue(name, e.nativeEvent.text);
        // trigger(name);
    };

    return (
        <View style={styles.blockContainer}>
            {data?.header?.Ismobileshow === true && (
                <View>
                    <Text style={styles.blockTitle}>{data?.header?.Displayname}</Text>
                    {data?.fields?.map((item) => (
                        <FormInput
                            key={item.Key}
                            label={item.Displayname}
                            name={item.Key}
                            onChange={(e) => handleInputChange(e, item.Key)}
                            placeholder={`Enter ${item.Displayname}`}
                            control={control}
                            secureTextEntry={false}
                            defaultValue=""
                            returnKeyType="next"
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

