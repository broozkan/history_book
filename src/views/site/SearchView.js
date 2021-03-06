import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer';
import SectionPageTitle from '../../components/Section/SectionPageTitle';

import FormSearchStudent from '../../components/Form/FormSearchStudent';
import FormSearchStaff from '../../components/Form/FormSearchStaff';
import { ArchiveContextWrapper } from '../../contexts/ArchiveContext';
import TabsSearchTypes from '../../components/Tabs/TabsSearchTypes';


const SearchView = (props) => {

    const [state, setState] = useState({
        search_form: ''
    })

    

    // render form 
    let searchFormHtml = ''
    let pageTitle = ''
    if(props.match.params.type == "ogrenci"){
        searchFormHtml = <FormSearchStudent />
        pageTitle = "ÖĞRENCİ ARA"
    }else{
        pageTitle = "PERSONEL ARA"
        searchFormHtml = <FormSearchStaff />
    }



    return (
        <>
            <SectionPageTitle page_title={pageTitle} />
            <section id="page-content">
                <div className="container">

                    <div id="blog">

                        <div id="blog" className="post-3-columns m-b-30" data-item="post-item">

                            <div class="tabs">

                                <TabsSearchTypes type={props.match.params.type} />
                                  {searchFormHtml}

                                
                            </div>


                        </div>

                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default SearchView