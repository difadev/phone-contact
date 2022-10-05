import Input from '@/components/input';
import React from 'react'
import { useForm } from 'react-hook-form';
import Buttons from '@/components/buttons';
import Alert from '@/components/alert';
import styled from '@emotion/styled';


export default function FormPhone({ type, dataProps, finishSubmit, loading, error, stateFinish }: any) {
    const TitleContact = styled.p``
    const [stateData, setStateData] = React.useState({
        phone_number: dataProps ? dataProps : '',
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onChangeData = (name: string, value: string) => {
        setStateData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitForm = () => {
        finishSubmit(stateData)
    }

    return (
        <>
            <TitleContact>{type === 'add' ? 'New Phone' : 'Edit Phone'}</TitleContact>

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
            <form data-testid="submitPhone" onSubmit={handleSubmit(submitForm)}>

                <Input
                    label="Phone Number"
                    placeholder='08771027272'
                    type="numeric"
                    dataTest='inputPhoneTest'
                    id={`phone_number`}
                    name={`phone_number`}
                    styleProps={
                        {
                            background: '#dfe1eb'
                        }
                    }
                    value={stateData.phone_number}
                    onChange={onChangeData}
                    register={register}
                    validateOptions={
                        {
                            minLen: 10,
                            maxLen: 15
                        }
                    }
                    requiredData
                    errors={errors[`phone_number`]}
                />
                <Buttons onClick={() => { }} dataTest="buttonSubmitTest" disabled={loading ? true : false} title={loading ? 'Loading' : 'Submit'} type="submit" />
            </form>
        </>
    );
}
