import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver }  from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TodoContextType } from '../contexts/TodoContextType';
import { TodoContext } from "../contexts/TodoContext";

const schema = yup.object().shape({
    title: yup.string().required('Tarefa inválida'),
});

type AddTodoForm = {
    title: string
}

const AddTodo = () => {

    const { addTodo } = useContext<TodoContextType>(TodoContext);
    const { register, handleSubmit, formState:{errors}} = useForm<AddTodoForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: AddTodoForm, e: any) => {
        addTodo(data.title);
        e.target.reset();
        window.location.href = '/';
    }

    return ( 
        <form onSubmit={handleSubmit(onSubmit)}>
            <h4>Nova tarefa</h4>
            <div className="uk-margin uk-width-1-1">
                <input type="text" name="title" id="title" placeholder="Nova tarefa..." className="uk-input" ref={register.name} />
                <span><small><strong className="uk-text-danger">{errors.title?.message}</strong></small></span>
            </div>
            <div className="uk-width-1-1">
                <button type="submit" className="uk-button uk-button-primary">Salvar</button>
            </div>
        </form>
    );
}

export default AddTodo;