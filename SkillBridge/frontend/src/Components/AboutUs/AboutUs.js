import React from 'react'
import {Whatsapp,Facebook,Envelope, Instagram} from 'react-bootstrap-icons'
import {Row, Col} from 'antd'

function AboutUs() {
    return (
        <div className='mt-5 '>
            <div className=' px-3'>
                <Row gutter ={[16,16]}>
                    <Col md={{span:8,offset:8}}>
                        <h1 className=' mt-3 p-2 px-3'
                            style=  {{textDecorationStyle:'solid' ,textDecorationColor :'#1c226b' ,
                                    textDecorationLine: 'underline',textDecorationThickness: '4px',
                                    backgroundColor: '#5585b5',fontFamily : ' Helvetica',textAlign:"center"
                                    }}
                        >
                            <b><i>SkillBridge Resume-Builder </i></b>
                        </h1>
                    </Col>
                </Row>
            </div>
            <div >
                <Row gutter ={[16,16]}>
                    <Col md={{span:8,offset:8}}>
                        <div className=' mt-2  mb-5 p-2 px-3'
                            style= {{fontSize:'17px',
                                    textAlign: 'justify',
                                    textJustify : 'inter-word', }}
                        >
                            <i>
                            At SkillBridge, we offer a vibrant collection of eye-catching, professional resume and cover letter templates designed to help you stand out and leave a lasting impression.

Our templates are crafted to meet the needs of job seekers across a wide range of industries. They are expertly designed, employer-ready, ATS-friendly, and easy to customize.

Simply choose from dozens of modern templates and use our intuitive Resume Builder to create a professional, polished resume in just minutes.
                            </i>
                        </div>
                    </Col>
                </Row>
                
                <div className='media'>
                    <Row gutter ={[16,16]}>
                        <Col md={{span:8,offset:8}}>
                            <img className='align-self-center mx-auto' style={{maxWidth:'100%'}} src ="https://cdn.pixabay.com/photo/2017/10/06/09/34/group-2822423__340.png" alt="discussion"/>
                        </Col>
                    </Row>
                </div>
            </div>
            
            <div className='mt-5 px-3 '>
                <Row gutter ={[16,16]}>
                    <Col md={{span:8,offset:8}}>
                        <h3 className='px-4' style={{wordSpacing:"5px", letterSpacing:"1px"}}>
                            Share with your friends.
                        </h3>
                        <div style= {{display:'flex',background:'#faf8f8',}}>
                            <div className='ms-5  p-2'> 
                                <Whatsapp style = {{ fontSize:"25px", color:"green" }}/>
                            </div>
                            <div  className='p-2 ms-4' > 
                                <Facebook style = {{ fontSize:"25px", color:"blue" }}/>
                            </div>
                            <div  className='p-2 ms-4' > 
                                <Envelope  style = {{ fontSize:"25px", color:"red" }}/>
                            </div>
                            <div  className='p-2 ms-4' > 
                                <Instagram  style = {{ fontSize:"25px", color:"#c50d66" }}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AboutUs
