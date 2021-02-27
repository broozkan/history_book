import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import CardLoader from '../Loader/CardLoader'
import Swal from 'sweetalert2'
import { fixdate } from '../../services/fixdate'
import { Component } from 'react'


class FormStaff extends Component {

    constructor() {
        super()

        this.state = {
            staff_school: '',
            staff_name: '',
            staff_surname: '',
            staff_photo: '',
            staff_birthday: '',
            staff_nationality: '',
            staff_country: '',
            staff_gender: '',
            staff_duty: '',
            staff_branch: '',
            staff_duty_beginning_date: '',
            staff_duty_ending_date: '',
            schools: [],
            is_schools_loaded: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getStaff = this.getStaff.bind(this)
        this.resetState = this.resetState.bind(this)
        this.getSchools = this.getSchools.bind(this)
    }

    getSchools = async () => {
        const schools = await api.get('/school/list/1')

        this.setState({
            schools: schools.data.docs,
            is_schools_loaded: true
        })
    }

    resetState = () => {
        this.setState({
            staff_school: [],
            staff_name: '',
            staff_surname: '',
            staff_photo: '',
            staff_birthday: '',
            staff_nationality: '',
            staff_country: '',
            staff_gender: '',
            staff_duty: '',
            staff_branch: '',
            staff_duty_beginning_date: '',
            staff_duty_ending_date: ''
        })
    }

    componentDidMount() {
        if (this.props.staff_id) {
            this.getStaff()
        }
        this.getSchools()
    }

    getStaff = async () => {
        this.setState({
            is_form_submitting: true
        })

        const staff = await api.get('/staff/get/' + this.props.staff_id, {})



        this.setState(staff.data)

    }

    handleChange = (e) => {
        if (e.target.type === "file") {
            this.setState({
                [e.target.name]: e.target.files[0]
            })
        } else if (e.target.type === "select-one") {

            if (e.target.name == "staff_school") {
                let staffSchoolArray = new Array()

                this.state.schools.map((item) => {
                    if (e.target.value == item._id) {
                        staffSchoolArray.push(item)
                    }
                })

                this.setState({
                    staff_school: staffSchoolArray
                })

            } else {
                this.setState({
                    [e.target.name]: e.target.value
                })
            }

        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

        console.log(this.state);
    }


    handleSubmit = async (e) => {
        e.preventDefault()

        this.setState({
            is_form_submitting: true
        })

        let formData = new FormData()


        await formData.append('file', this.state.staff_photo)
        await formData.append('data', JSON.stringify(this.state))


        let submitResponse
        if (this.props.staff_id) {
            submitResponse = await api.put('/staff/update/' + this.props.staff_id, formData, { headers: { 'content-type': 'multipart/form-data' } })

            this.setState({
                is_form_submitting: false
            })
        } else {
            submitResponse = await api.post('/staff/new', formData, { headers: { 'content-type': 'multipart/form-data' } })
            this.resetState()
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı',
                text: 'Personel kaydedildi',
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: 'Hata',
                text: submitResponse.data.responseData,
                icon: 'error'
            })

        }


    }


    render() {

        // render schools 
        let schoolOptionsHtml = ''
        let schoolOptionValue = ''
        if (this.state.is_schools_loaded) {
            schoolOptionsHtml = this.state.schools.map((item) => {
                return (
                    <option value={item._id}>{item.school_name}</option>
                )
            })
            if (this.state.staff_school.length > 0) {
                schoolOptionValue = this.state.staff_school[0]._id
            }
        }

        // render card loader
        let cardLoaderHtml = ''
        if (this.state.is_form_submitting) {
            cardLoaderHtml = <CardLoader />
        } else {
            cardLoaderHtml = ''
        }


        // render profile photo
        let staffPhotoHtml = ''
        if (this.state.staff_photo) {
            staffPhotoHtml = <img className="img-thumbnail" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + this.state.staff_photo} />
        }
        return (
            <div className="card">
                <div className="card-header">
                    <span className="h4">Personel Formu</span>
                    <p className="text-muted">Yeni personel ekleyebilir veya mevcut personellerinizi düzenleyebilirsiniz.</p>
                </div>
                <div className="card-body">
                    <form id="form1" className="form-validate" novalidate="novalidate" onSubmit={this.handleSubmit}>
                        <div className="h5 mb-4">Kişisel Bilgileri</div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="staff_school">Okulu (*)</label>
                                <select className="form-control" onChange={this.handleChange} required value={schoolOptionValue} name="staff_school">
                                    <option selected disabled value="">Okul Seçiniz</option>
                                    {schoolOptionsHtml}
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_name">Adı (*)</label>
                                <input type="text" className="form-control" onChange={this.handleChange} value={this.state.staff_name} name="staff_name" id="staff_name" placeholder="Personel adını giriniz" required="" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="staff_surname">Soyadı (*)</label>
                                <input type="text" className="form-control" onChange={this.handleChange} value={this.state.staff_surname} name="staff_surname" id="staff_surname" placeholder="Personel soyadını giriniz" required="" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_photo">Fotoğrafı (*)</label>
                                <input type="file" className="form-control" onChange={this.handleChange} name="staff_photo" id="staff_photo" placeholder="Personel adını giriniz" required="" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label for="staff_birthday">Doğum Tarihi (*)</label>
                                <input type="date" className="form-control" onChange={this.handleChange} value={this.state.staff_birthday} name="staff_birthday" id="staff_birthday" placeholder="Personel doğum tarihini giriniz" required="" />
                            </div>
                            <div className="form-group col-md-4">
                                <label for="staff_nationality">Uyruğu (*)</label>
                                <select className="form-control" onChange={this.handleChange} value={this.state.staff_nationality} name="staff_nationality" id="staff_nationality">
                                    <option value="" disabled selected>Uyruk Seçiniz</option>
                                    <option value="turkish">Türk</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="staff_country">Doğum Yeri (*)</label>
                                <select className="form-control" onChange={this.handleChange} value={this.state.staff_country} name="staff_country" id="staff_country">
                                    <option value="" disabled selected>Şehir Seçiniz</option>
                                    <option value="Adıyaman">Adıyaman</option>
                                    <option value="Ankara">Ankara</option>
                                    <option value="Sivas">Sivas</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_gender">Cinsiyeti (*)</label>
                                <select className="form-control" onChange={this.handleChange} value={this.state.staff_gender} name="staff_gender" id="staff_gender" required>
                                    <option value="" disabled selected>Cinsiyet Seçiniz</option>
                                    <option value="male">Erkek</option>
                                    <option value="female">Kadın</option>
                                </select>
                            </div>
                        </div>

                        <div className="h5 mb-4">Çalışma Bilgileri</div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_duty">Görevi (*)</label>
                                <select className="form-control" onChange={this.handleChange} value={this.state.staff_duty} name="staff_duty" id="staff_duty" required>
                                    <option value="" disabled selected>-Görev Seçiniz-</option>
                                    <option value="principal">Okul Müdürü</option>
                                    <option value="vice_principal">Okul Müdür Yardımcısı</option>
                                    <option value="servant">Hademe</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_branch">Branşı (*)</label>
                                <select className="form-control" onChange={this.handleChange} value={this.state.staff_branch} name="staff_branch" id="staff_branch" required>
                                    <option value="" disabled selected>-Branş Seçiniz-</option>
                                    <option value="Matematik">Matematik</option>
                                    <option value="Türkçe">Türkçe</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="staff_duty_beginning_date">Görev Başlangıç Tarihi (*)</label>
                                <input type="date" className="form-control" onChange={this.handleChange} value={this.state.staff_duty_beginning_date} name="staff_duty_beginning_date" id="staff_duty_beginning_date" placeholder="Personel görev başlangıç tarihi" required="" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="staff_duty_ending_date">Görev Bitiş Tarihi (*)</label>
                                <input type="date" className="form-control" onChange={this.handleChange} value={this.state.staff_duty_ending_date} name="staff_duty_ending_date" id="staff_duty_ending_date" placeholder="Personel görev bitiş tarihi" required="" />
                            </div>
                        </div>
                        <button type="submit" className="btn m-t-30 mt-3">Kaydet</button>
                        <a href="/admin/staff/list" className="btn btn-secondary m-t-30 mt-3">Geri</a>
                    </form>
                </div>
            </div>
        )
    }




}

export default FormStaff