import { useRef } from 'react'
import { ContainerCard, InputComponent, ErrorText, ContainerButton, TextLabel, ContainerInput, ContainerIconLeft } from "./styles"
import { IPropsInput } from "./type"
import Image from 'next/image'

export default function Input({ type, onChange, placeholder, name, id, register, requiredData, value, iconLeft, iconRight, errors, label, styleProps, onChangeIcon, ref, validateOptions, dataTest="input-testing" }: IPropsInput) {

    const refData = useRef(ref)
    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        let formatValue;
        let valueChange = e.currentTarget.value;
        if (type === 'numeric') {
            formatValue = valueChange.replace(/[^0-9\.]+/g, '');
        } else {
            formatValue = valueChange.replace(/[^a-zA-Z ]+/g, '');
        }
        refData.current = formatValue
        onChange(name, formatValue)
    }
    return (
        <ContainerInput>
            {label && (
                <TextLabel data-testid="labelTest">{label}</TextLabel>
            )}
            <ContainerCard>
                {iconLeft && (
                    <ContainerIconLeft>
                        <Image src={iconLeft} width={18} height={18} alt="buttonIconRight" />
                    </ContainerIconLeft>
                )}
                <InputComponent
                    data-testid={dataTest}
                    placeholder={placeholder}
                    id={id}
                    type="text"
                    styleProps={styleProps}
                    name={name}
                    value={value}
                    minLength={validateOptions.minLen}
                    maxLength={validateOptions.maxLen}
                    {...register(name, {
                        required: {
                            value: requiredData,
                            message: 'Wajib Diisi'
                        },
                    })}
                    onChange={(e:any) => {handleOnChange(e)}}

                />
                {iconRight && (
                 <ContainerButton type="button" data-testid="buttonIconTest" onClick={onChangeIcon}>
                    <Image src={iconRight} width={24} height={24} alt="buttonIconRight" />
                </ContainerButton>
                )}

            </ContainerCard>
            {errors && (
                <ErrorText data-testid="errorTest">{label ? label : name} must required.</ErrorText>
            )}
        </ContainerInput>
    )
}