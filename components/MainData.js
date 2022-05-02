
const titleStyle = {
    fontWeight: "700",
    fontSize: "36px",
    lineHeight: "45px"
}

const descriptionStyle = {
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "28px"
}

export const dataArr = [
    {
        id: 1,
        title: 'aa',
        description: 'a 섹션',
        titleStyle: titleStyle,
        descriptionStyle: descriptionStyle
      },
      {
        id: 2,
        title: 'bb',
        description: 'b 섹션',
        titleStyle: titleStyle,
        descriptionStyle: descriptionStyle
    },
      {
        id: 3,
        title: 'cc',
        description: 'c 섹션',
        titleStyle: Object.assign({color: "white", ...titleStyle}),
        descriptionStyle: Object.assign({color: "white", ...descriptionStyle})
    }
]