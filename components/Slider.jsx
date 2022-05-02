import styled, { keyframes, css } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import SliderItem from './SliderItem'
import { dataArr } from './MainData.js'

function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=> {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


export default function Slider() {
    
    const rendingData = dataArr;
    const items = ['#4DCFE1', '#7DD1FF', '#6A26DA'];
    const 양끝에_추가될_데이터수 = 1;
    const transitionTime = 300;
    const transitionStyle = `transform ${transitionTime}ms ease-in 0s`;

    let slides = setSlides();
    const [currentIndex, setCurrentIndex] =  useState(양끝에_추가될_데이터수);
    const [slideTransition, setTransition] = useState(transitionStyle);
    const itemSize = items.length;
    
    

    function replaceSlide(index) {
        setTimeout(()=> {
            setTransition('');
            setCurrentIndex(index);
        }, transitionTime)
    }

    function handleSlide(index) {
        setCurrentIndex(index);
        if (index < 양끝에_추가될_데이터수) {
            index += itemSize;
            replaceSlide(index);
        }
        else if (index >= itemSize + 양끝에_추가될_데이터수) {
            index -= itemSize;
            replaceSlide(index)
        }
        setTransition(transitionStyle);
    }

    function handleDotSlide(currentIndex,index) {
      if (index ===1 && currentIndex >=2) {
        handleSlide(1);
      } else if(index ===2 && currentIndex > 2) {
        handleSlide(2);
      } else {
        handleSlide(index+1);
      }
    }

    
    

    function setSlides() {
        let addedFront = [];
        let addedLast = [];
        var index = 0;
        while (index < 양끝에_추가될_데이터수) {
            addedLast.push(items[index % items.length]);
            addedFront.unshift(items[items.length- 1 - index % items.length]);
            index++;
        }
        return [...addedFront, ...items, ...addedLast];
    }

    function getItemIndex(index) {
        index -= 양끝에_추가될_데이터수;
        if (index < 0) {
            index += itemSize;
        }
        else if (index >= itemSize) {
            index -= itemSize;
        }
        return index;
    }

    function dotLogic(idx) {
      if(idx === 0) {
        return -1;
      }else if(idx ===1) {
        return 
      }
    }


    useInterval(()=> {
        handleSlide(currentIndex+1);
    }, 3000);


    return (
        <StyledSliderArea backColor={currentIndex-1}>
            <StyledSlider>
                <StyledSliderList>
                    <StyledSliderTract currentIndex={currentIndex} slides={slides} style={{transition: slideTransition}}>
                        {
                            slides.map((slide, SlideIndex) => 
                                {
                                    const itemIndex = getItemIndex(SlideIndex);
                                    return (
                                        // <div key={SlideIndex}
                                        // className={`slider-item`}
                                        //  >
                                        //   <div className={`slider-back`} style={{ background: items[itemIndex]}}>
                                        //     {itemIndex}({SlideIndex})
                                        //   </div>  
                                             <SliderItem
                                                key={SlideIndex}
                                                title={rendingData[itemIndex].title}
                                                description={rendingData[itemIndex].description}
                                                titleStyle= {rendingData[itemIndex].titleStyle}
                                                descriptionStyle={rendingData[itemIndex].descriptionStyle}
                                                index={SlideIndex} 
                                                 /> 
                                        // </div>
                                    )
                                     }
                            )
                        }
                    </StyledSliderTract>
                    
                    <StyledButtonWrapper>
                        <StyledDotContainer>
                            {items.map((item, idx)=> {
                                return (
                                    <Dot 
                                         key={idx}
                                         dotIndex={currentIndex-1}
                                         currentIndex={currentIndex}
                                         onClick={() => handleDotSlide(currentIndex, idx)}
                                         >
                                    </Dot>
                                )
                            })}
                        </StyledDotContainer>
                    </StyledButtonWrapper>
                </StyledSliderList>
            </StyledSlider>
        </StyledSliderArea>
    )

}

const move1to2 = keyframes`
  from {
    transform: translateX(0px);
  }
  
  100% { 
    transform: translateX(16px);
  }
`;

const move1to3 = keyframes`
  0% {
    transform: translateX(16px);
  }
  
  100% {
    transform: translateX(30px);
  }
`

const move1to1 = keyframes`
  0% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(0px);
  }
`

const move2to1 = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-31px);
  }
`

const move2to2 = keyframes`
  0% {
    transform: translateX(-31px);
  }

  100% {
    transform: translateX(0px);
  }
`

const move3to2 = keyframes`
  0% {
    transform: translateX(0px);
  }

  100% {
    transform: translateX(-31px);
  }
`

const move3to3 = keyframes`
  0% {
    transform: translateX(-31px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const move1from3to2 = keyframes`
  0% {
    transform: translateX(30px);
  }

  100% {
    transform: translateX(16px);
  }
`


const fixedTow = keyframes`
  0% {
    transform: translateX(-31px);
  }
  100% {
    transform: translateX(-31px);
  }
`



function isBackColor(backColor) {
  switch(backColor) {
    case 0:
      return '#4DCFE1'
    case 1:
      return '#7DD1FF'
    case 2:
      return '#6A26DA'
    default :
      return '#6A26DA'
  }
}


const StyledSliderArea = styled.div`
    width: 9600px;
    height: 1008px;
    background-color: ${(props) => isBackColor(props.backColor)};
    transition: all ease .3s 0s;
`;
const StyledSlider = styled.div``;
const StyledSliderList = styled.div``;
const StyledSliderTract = styled.div`
    display: flex;
    transform: translateX(${(props) => ((-100/props.slides.length) * (props.currentIndex))}%);
    .slider-item{
        width: 1920px;
        height: 1008px;
    };
    .slider-back {
        width: 100%;
        height: 100%;
    };
`;

const StyledButtonWrapper = styled.div`
  position: absolute;
  left: 360px;
  bottom: 174px;
  z-index: 0;
`

const StyledDotContainer = styled.div`
    width: 64px;
    display: flex;
`
let isFirst = false;
function isPosition (dotIndex, currentIndex) {
    if (dotIndex == 0 && !isFirst){
        return;
    }

    if (dotIndex === 1) {
      return css`
            &:nth-child(1){
                animation: ${move1to2} .5s forwards;
            }
            &:nth-child(2){
                animation: ${move2to1} .5s forwards;
            }
            `
    }
     else if (dotIndex === 2) {
        return css`
          &:nth-child(1){
              animation: ${move1to3} .5s forwards;
          }
          &:nth-child(2){
              animation: ${fixedTow} .5s forwards;
          }
          &:nth-child(3) {
              animation: ${move3to2} .5s forwards;
          }
      `
    } else {
      return css`
         &:nth-child(1){
                animation: ${move1to1} .5s forwards;
            }
            &:nth-child(2) {
                animation: ${move2to2} .5s forwards;
            }
            &:nth-child(3) {
                animation: ${move3to3} .5s forwards;
            }
      `
    }
}


const Dot = styled.div`
    width: 8px;
    height:8px;
    border-radius: 50%;
    background-color: white;
    margin-right: 8px;
    cursor: pointer;


    &:nth-child(1) {
        width: 24px;
        background-color: #00BCD4;
        border-radius: 10px;
    }
    ${(props) => isPosition(props.dotIndex, props.currentIndex)};

`
