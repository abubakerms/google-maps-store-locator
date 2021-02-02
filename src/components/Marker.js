import React from 'react'
import axios from 'axios'
import '../app.css'

import { FaSearchengin } from "react-icons/fa";

//Importing from googgle maps
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";

 

class MarkerMap extends React.Component {

    constructor(){
        super()
        this.state={
            stores:[],
            storeName:'',
            position:{lat:12.972718 , lng:77.619546 }, 
            infoWindow:false,
            defaultZoom:12,
            defaultCenter:{ lat: 12.972718, lng: 77.736451 },
            storepostion:{lat:12.972718,lng:77.736451},
            name:'',
            name1:''
     
        }
        
    }

    // Making API Call to get the all stores
    componentDidMount(){
        axios.get('http://localhost:9100/list')
            .then(response=>{
                const data=response.data
                  this.setState({stores:response.data})
             })
            .catch(err=>{
                console.log(err )
            })    
            
        
    }

    // Displaying the Information of the clicked place
    onClick=(store)=>{ 
        this.state.storeName=store.storeName
        this.setState({infoWindow:true})    
        this.state.infoWindow=true
    }

    // Closing the Information on clicking close button
    onClose=()=>{
        this.setState({infoWindow:false})    
    }

  
    // Handling the input value entered by the User
    handleInputChange=(e)=>{
        const value=(e.target.value).toLowerCase()
        this.state.name1=value  
    }
    

   
    handlebuttonClick=()=>{
        this.setState({name:'bangalore'})
    }

    // Handling the submit button
    handleSubmit=(e)=>{
        e.preventDefault() 
        this.setState({name:this.state.name1})       
        this.state.stores.map(store=>{
           
            if((this.state.name1)==(store.address.city).toLowerCase()){
              let  storepostion={
                    lat: store.location.coordinates[1],
                    lng: store.location.coordinates[0]
                }      
                this.setState({position:storepostion})      
            } 
        })
       }
    
       

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            // Displaying the google map   
            <GoogleMap
                defaultZoom={this.state.defaultZoom}
                defaultCenter ={this.state.position}
            > 
               {
                  this.state.stores.map((store,index)=>{
                      return(
                          <div>  
                              {
                                  (this.state.name1)==(store.address.city).toLowerCase()&&
                                  <Marker 

                                  // Assiging the default value of the map
                                  label={index}
                                  position={{ lat: store.location.coordinates[1], lng: store.location.coordinates[0] }}
                                  
                                  defaultCenter={{ lat: store.location.coordinates[1], lng: store.location.coordinates[0] }}
                                
                                  onClick={()=>{
                                      this.onClick(store)
                                  }}

                                >
                                  </Marker>
                              } 
                            

                             {/* Managing the Information required for the user on the map */}

                              <Marker 
                               position={this.state.position}
                              >
                              {
                                        this.state.infoWindow&& 
                                        <InfoWindow   onCloseClick={()=>{
                                            this.onClose(store)
                                        }}
                                        >
                                            <h1>{this.state.storeName}</h1>
                                    
                                        </InfoWindow>
                                     }
                              </Marker>        
                          </div>
                      ) 
                   })
                }    

              

            </GoogleMap>
        ));
        return (
            
            <div  style={{ height: '100vh', width: '100%' }}>
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1DzGkXgzAOiiRM4CHX7uY62VBtHs1-N8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100vh` }} />}
                />

                 {/* Form for the user input and submit */}
                <form onSubmit={this.handleSubmit}>
                <div >  
                        <div id="store-title">
                            <h1>Store Locator</h1>
                        </div>

                        <div class="search-icon">
                            <div class="search">
                                <input type="text" onChange={this.handleInputChange} placeholder="Enter pin code" />
                                <button  color="black"  type="submit" >
                                <FaSearchengin  color="black" size="8rems"/>          

                                </button>
                        
                            </div>
                            
                        </div>


                        {
                            this.state.stores.map(store=>{
                                return(
                                    <div>
                                        {
                                            (this.state.name )==(store.address.city).toLowerCase()&&
                                            <div class="store-list">
                                            <div class="stores-list">

                                                {
                            
                                                        this.state.stores.map(store=>{
                                                            return(
                                                                <div>
                                                                    {
                                                                        (this.state.name )==(store.address.city).toLowerCase()&&
                                                                    
                                                                        <div>
                                                                        <h1  id="store-list-h1" onClick={()=>{
                                                                                this.onClick(store)
                                                                                }}
                                                                                > {store.addressLines}
                                                                        </h1> 
                                                                        <hr></hr>
                                                                        
                                                                        </div>
                                                                    
                                                                    }
                                                                </div>
                                                            )
                                                        })
                                                 }
                                             </div>
                                            
                                            </div>
                                         }
                                    </div>
                                )
                            })
                        }
                       

             
                  </div>
                
                  </form>
            </div>
        )
    }
}

export default MarkerMap