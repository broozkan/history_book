import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation

} from 'react-router-dom'
import Header from '../components/Header/Header'
import HomeView from '../views/site/HomeView'
import AboutView from '../views/site/AboutView'
import BlogView from '../views/site/BlogView'
import GalleryView from '../views/site/GalleryView'
import ContactView from '../views/site/ContactView'
import BlogDetailView from '../views/site/BlogDetailView'
import ArchiveView from '../views/site/ArchiveView'
import SearchView from '../views/site/SearchView'
import SearchResultView from '../views/site/SearchResultView'
import LoginView from '../views/site/LoginView'
import StudentProfileView from '../views/site/StudentProfileView'
import StaffProfileView from '../views/site/StaffProfileView'
import { ArchiveContextWrapper } from '../contexts/ArchiveContext'
import { SiteUserContextWrapper } from '../contexts/SiteUserContext'
import LogoutView from '../views/site/LogoutView'
import GalleryDetailView from '../views/site/GalleryDetailView'
import DonateView from '../views/site/DonateView'
import DonateInstituesView from '../views/site/DonateInstituesView'
import PaymentView from '../views/site/PaymentView'
import PaymentSuccessView from '../views/site/PaymentSuccessView'
import PaymentErrorView from '../views/site/PaymentErrorView'

const RouterSite = (props) => {



    return (
        <Router>
            <SiteUserContextWrapper>
                <Header />
                <Switch>
                    <Route path="/" exact component={HomeView}></Route>
                    <Route path="/nedir" exact component={AboutView}></Route>
                    <Route path="/blog" exact component={BlogView}></Route>
                    <Route path="/login" exact component={LoginView}></Route>
                    <Route path="/logout" exact component={LogoutView}></Route>
                    <Route path="/blog/detay/:postId" exact component={BlogDetailView}></Route>
                    <Route path="/fotograf-galerisi/" exact component={GalleryView}></Route>
                    <Route path="/fotograf-galerisi/detay/:photoGalleryCategoryId" component={GalleryDetailView}></Route>
                    <Route path="/bagis" exact component={DonateView}></Route>
                    <Route path="/bagis-kurumlari" exact component={DonateInstituesView}></Route>
                    <Route path="/odeme" exact component={PaymentView}></Route>
                    <Route path="/odeme/basarili" exact component={PaymentSuccessView}></Route>
                    <Route path="/odeme/basarisiz/:error" exact component={PaymentErrorView}></Route>
                    <Route path="/bize-ulasin" exact component={ContactView}></Route>
                    <ArchiveContextWrapper>
                        <Route path="/arsiv" exact component={ArchiveView}></Route>
                        <Route path="/arsiv/ara/:type/:schoolName" exact component={SearchView}></Route>
                        <Route path="/arsiv/arama-sonuclari/:searchBy" exact component={SearchResultView}></Route>
                        <Route path="/arsiv/ogrenci/:studentId" exact component={StudentProfileView}></Route>
                        <Route path="/arsiv/personel/:staffId" exact component={StaffProfileView}></Route>
                    </ArchiveContextWrapper>



                </Switch>
            </SiteUserContextWrapper>
        </Router>
    )

}

export default RouterSite