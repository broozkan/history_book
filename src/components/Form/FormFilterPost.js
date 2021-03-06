import React, {useState} from 'react'


const FormFilterPost = (props) => {

    const [state, setState] = useState({
        post_name: '',
        post_gender: ''
        
    })

    const resetState = () => {
        setState({
            post_name: '',
            post_gender: '' 
        })
    }

    const handleChange = (e) => {
        
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
        
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        props.onSubmit(props.pagination_info.page, state)
    }

    
    return (
        <form className="form-inline" onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="post_name">Adı</label>
                <input className="form-control" onChange={handleChange} value={state.post_name} name="post_name" id="post_name" placeholder="Personel adı giriniz" />
            </div>
            <div className="form-group ml-3">
                <label for="post_gender">Cinsiyeti</label>
                <select className="form-control" onChange={handleChange} value={state.post_gender} name="post_gender" id="post_gender">
                    <option value="">Farketmez</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                </select>
            </div>
            <div className="form-group ml-3">
                <button type="submit" className="btn btn-sm">Ara</button>
                <a href="#" className="btn btn-sm btn-secondary" onClick={resetState}>TEMİZLE</a>
            </div>
        </form>
    )
}

export default FormFilterPost