import React from "react";
import { Search, PinMapFill, PeopleFill } from "react-bootstrap-icons";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Weather from "./Weather";

const SearchPage = ()=>{
  const [countries, setCountries] = useState()
  const [list, setList] = useState([])
  const [input, setInput] = useState('')
  

  useEffect(() => {
    const url = 'https://restcountries.com/v3.1/all'
    fetch(url)
      .then(response => response.json())
      .then(
        response => {
          console.log(response)
          setCountries(response)
        
        },
        error => {
          console.log(error)
        }
      )
  }, [])


  const getCountry = e => {
    setInput(e.target.value.toLowerCase())
    const newCountries = countries.filter(ele => ele.name.common.toLowerCase().includes(input))
    
    setList(newCountries)
  }

  const showCountry = index => {
    setList([list[index]])
   
  }

  const mousein = (event)=>{
    event.target.style.backgroundColor = 'rgba(220, 206, 212, 0.5)'
  }
  const mouseout = (event)=>{
    event.target.style.backgroundColor = 'rgba( 239, 221, 218, 0.5)'
  }
    return(
        <>
    
    <InputGroup className="mb-3" style={{ border:'#a39d9b solid 2px', borderRadius:'2px'}}>
        <InputGroup.Text  id="basic-addon1" ><Search></Search></InputGroup.Text>
        <Form.Control
          onChange={getCountry}
          style={{opacity:0.4}}
          placeholder="search by country"
          aria-label="search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      {input === '' ? null : list?.length > 5 ? (
          <p style={{color:'#a39d9b', fontSize:'120%'}} className='text-center tracking-wider opacity-80'>
            Too many matches, please be more specific.
          </p>
        ) : (
          <Card style={{ boxShadow:'0 8px 32px 0 rgba( 0, 0, 0, 0.18 )', backdropFilter:'blur( 7.5px )', width: '40%', marginLeft:'30%', backgroundColor:'rgba( 239, 221, 218, 0.1)'}}>
            <ListGroup variant="flush" >
          {list?.map((item, index) => (
            <ListGroup.Item style={{backgroundColor:'rgba( 239, 221, 218, 0.5)', cursor:'pointer'}} onMouseEnter={mousein} onMouseLeave={mouseout }>
            <p style={{color:'#171414', fontSize:'120%'}}
              onClick={() => showCountry(index)}
              key={index}
              className='text-center text-xl tracking-wider py-2 hover:cursor-pointer opacity-80 hover:opacity-100'
            >
              {item.name.common}
            </p>
            </ListGroup.Item>
          ))}
          </ListGroup>
          </Card>
          
          
        )}
           {input !== '' && list.length === 0 && (
          <p className=' text-center tracking-wider opacity-80'>
            The country was not found.
          </p>
        )}
        {list?.length == 1 && (
          <div className="row" style={{paddingTop:'5%'}}>
            <div className="col-sm">
          <Card style={{ boxShadow:'0 8px 32px 0 rgba( 0, 0, 0, 0.18 )', backdropFilter:'blur( 7.5px )', width: '50%', backgroundColor:'rgba( 239, 221, 218, 0.1)'}}>
          <div className='flex flex-col justify-between h-5/6'>
            
            <div className='bg-slate-800 w-full bg-opacity-70 lg:w-3/5 relative tracking-wider p-4 rounded-md'>
              <div className='flex items-center justify-start gap-4 mb-4'>
                <h2 className='text-2xl mt-10 text-center flex items-center gap-7'>{list[0].name.common}</h2>
                <img style={{width:'50%', marginLeft:'25%'}} src={list[0].flags.png} alt={list[0].flags.alt} />
              </div>
              <p className='py-2 mt-10 text-center flex items-center gap-7'>
                <span className='text-lg'><PeopleFill></PeopleFill> Population:</span> {list[0].population}
              </p>
              <p className='py-2 mt-10 text-center flex items-center gap-7'>
                <span className='text-lg'><PinMapFill></PinMapFill> Capital:</span> {list[0].capital}
              </p>
            </div>
          </div>
          </Card>
          </div>
          <div className="col-sm">
          <Weather country={list[0].name.common} ></Weather>
          </div>

          </div>
        )}
      
        </>
    )
}

export default SearchPage