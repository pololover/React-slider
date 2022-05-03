import styled, { keyframes, css } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import SliderItem from './SliderItem'
import { dataArr } from './MainData.js'

const classJoinNames = (classNames = []) => {
  return classNames.join(" ");
}


function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(()=> {
        function tick() {
            savedCallback.current();
        }

        if (delay != null) {
          let id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
    });
}


export default function Slider() {

    const dotClickHandler = (i) => {
      console.log(i);
      console.log(currentIndex);
      if (i <= currentIndex-1) {
        setCurrentIndex(i);
      } else {
        setCurrentIndex(i+1);
      }
    }
    
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
      if (index - 양끝에_추가될_데이터수 < 0) {
          index += itemSize;
          replaceSlide(index)
      }
      else if (index - 양끝에_추가될_데이터수 >= itemSize) {
          index -= itemSize;
          replaceSlide(index)
      }
      setTransition(transitionStyle);
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
                            {currentIndex}
                            {items.map((item, idx)=> {
                                return (
                                    <Dot 
                                         className={classJoinNames([
                                           `dot-${idx}`,
                                           currentIndex === 1 || currentIndex === 4
                                           ? "dot-pos-0"
                                           : currentIndex === 2
                                           ? "dot-pos-1"
                                           : "dot-pos-2"
                                         ])}
                                         key={idx}
                                         onClick={() => dotClickHandler(idx)}
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


const StyledSliderArea = styled.div`
    width: 9600px;
    height: 1008px;
    transition: all ease .3s 0s;
    background-color: grey;
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



const Dot = styled.div`
    width: 8px;
    height:8px;
    border-radius: 50%;
    background-color: white;
    margin-right: 8px;
    cursor: pointer;

    &.dot-0,
    &.dot-1,
    &.dot-2 {
      position: absolute;
      transition: all 0.3s;
    }

    &.dot-0 {
      background-color: violet;
      &.dot-pos-0 {
        left: 0;
      }

      &.dot-pos-1 {
        left: 24px;
      }

      &.dot-pos-2 {
        left: 48px;
      }
    }

    &.dot-1 {
      &.dot-pos-0 {
        left: 24px;
      }

      &.dot-pos-1 {
        left: 0px;
      }

      &.dot-pos-2 {
        left: 0px;
      }
    }
    
    &.dot-2 {
      &.dot-pos-0 {
        left: 48px;
      }
      
      &.dot-pos-1 {
        left: 48px;
      }

      &.dot-pos-2 {
        left: 24px;
      }
    }

`
