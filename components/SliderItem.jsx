import styled from  'styled-components'
export default function SliderItem(props) {
    
    
    return (
        <StyledSliderItem>
            <StyledCardContainer>
                <StyledTextContainer>
                    <StyledTitleWrapper>
                        {props.title}
                    </StyledTitleWrapper>
                    <StyledDescriptionWrapper>
                        {props.description}
                    </StyledDescriptionWrapper>
                </StyledTextContainer>
            </StyledCardContainer>
        </StyledSliderItem>
    )
}


const StyledSliderItem = styled.div`
    width: 1920px;
    height: 1008px;
    padding: 0 360px;
`;

const StyledCardContainer = styled.div`
    margin-top: 290px;
    display: flex;
    width: 1200px;
    height: 380px;
    justify-content: space-between;
`

const StyledTextContainer = styled.div`
    margin-top: 59px;
`

const StyledTitleWrapper = styled.div`
    margin-bottom: 16px;
`;

const StyledDescriptionWrapper = styled.div`
   margin-bottom: 60px;
`
