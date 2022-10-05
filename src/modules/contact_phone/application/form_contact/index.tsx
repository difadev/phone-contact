import Input from '@/components/input';
import React from 'react'
import { useForm } from 'react-hook-form';
import { ADD_PHONE, REMOVE_PHONE } from './helpers';
import Buttons from '@/components/buttons';
import Alert from '@/components/alert';
import { TitleContact } from './styles';
import AddImage from '@/public/assets/icon/add.png'
import RemoveImage from '@/public/assets/icon/remove.png'


export default function FormContact({ type = 'add', dataProps, finishSubmit, loading, error, stateFinish }: any) {
    const [stateData, setStateData] = React.useState({
        first_name: dataProps?.first_name ? dataProps.first_name : '',
        last_name: dataProps?.last_name ? dataProps?.last_name : '',
        phones: dataProps?.phones ? dataProps?.phones : [{ number: '' }]
    })
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onChangeIcon = (type: string) => {
        if (type === ADD_PHONE) {
            setStateData(prevState => ({
                ...prevState,
                phones: [
                    ...prevState.phones, {
                        number: ""
                    }
                ]
            }))
        } else if (type === REMOVE_PHONE) {
            setStateData(prevState => ({
                ...prevState,
                phones: [
                    {
                        number: stateData.phones[0].number
                    }
                ]
            }))
        } else {
            return
        }
    }

    const generateIcon = (index: number) => {
        if (index === 0 && stateData.phones.length === 2) {
            return false
        }
        else if (index === 0) {
            return AddImage;
        } else {
            return RemoveImage
        }
    }
    const onChangeData = (name: string, value: string) => {
        if (name.includes('phones')) {
            const indexPhone: any = name.split("_");
            const statePrev = [...stateData.phones]
            statePrev[indexPhone[1]] = { number: value }
            setStateData(prevState => ({
                ...prevState,
                phones: statePrev
            }))
        } else {
            setStateData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const submitForm = () => {
        finishSubmit(stateData)
    }

    return (
        <>
            <TitleContact>{type === 'add' ? 'New Contact' : 'Edit Contact'}</TitleContact>

            {
                stateFinish && (
                    <Alert category='success' title={type === 'edit' ? 'Success Update' : "Success Insert"} />
                )
            }
            {
                error && (
                    <Alert category='danger' title={error.message} />
                )
            }
            <form data-testid="submitFormContact" onSubmit={handleSubmit(submitForm)}>
                <Input
                    label="Firstname"
                    placeholder='Firstname'
                    type="text"
                    dataTest="firstNameTest"
                    id="first_name"
                    name="first_name"
                    styleProps={
                        {
                            background: '#dfe1eb'
                        }
                    }
                    value={stateData?.first_name}
                    onChange={onChangeData}
                    register={register}
                    validateOptions={
                        {
                            minLen: 3,
                            maxLen: 50
                        }
                    }
                    requiredData
                    errors={errors.first_name}
                />
                <Input
                    label="Last Name"
                    placeholder='Last Name'
                    type="text"
                    dataTest="lastNameTest"
                    id="last_name"
                    name="last_name"
                    styleProps={
                        {
                            background: '#dfe1eb'
                        }
                    }
                    value={stateData?.last_name}
                    onChange={onChangeData}
                    register={register}
                    validateOptions={
                        {
                            minLen: 3,
                            maxLen: 50
                        }
                    }
                    requiredData
                    errors={errors.last_name}
                />
                {type !== 'edit' && stateData.phones.map((_: string, index: number) => (
                    <React.Fragment key={index}>
                        <Input
                            label="Phone Number"
                            placeholder='08771027272'
                            type="numeric"
                            dataTest="telpTest"
                            id={`phones_${index}`}
                            name={`phones_${index}`}
                            styleProps={
                                {
                                    background: '#dfe1eb'
                                }
                            }
                            value={stateData.phones[index].number}
                            onChange={onChangeData}
                            register={register}
                            requiredData={index === 0 ? true : false}
                            validateOptions={
                                {
                                    minLen: 10,
                                    maxLen: 15
                                }
                            }
                            iconRight={generateIcon(index)}
                            onChangeIcon={() => { stateData.phones.length === 1 ? onChangeIcon('add') : onChangeIcon('remove') }}
                            errors={errors[`phones_${index}`]}
                        />
                    </React.Fragment>
                ))}
                <Buttons dataTest="buttonSubmit" onClick={() => { }} disabled={loading ? true : false} title={loading ? 'Loading' : 'Submit'} type="submit" />
            </form>
        </>
    );
}
