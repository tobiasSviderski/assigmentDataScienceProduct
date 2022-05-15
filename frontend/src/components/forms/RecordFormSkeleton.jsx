import React, {createElement} from "react";
import {useForm} from "react-hook-form";

const RecordFormSkeleton = ({defaultValues, children, onSubmit}) =>{
    const { handleSubmit, control } = useForm({defaultValues});

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {React.Children.map(children, child => {
                return child.props.name
                    ? createElement(child.type, {
                        ...{
                            ...child.props,
                            control,
                            key: child.props.name
                        }
                    })
                    : child;
            })}
        </form>
    );
}

export default RecordFormSkeleton;