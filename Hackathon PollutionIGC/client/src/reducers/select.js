const initialState = [0,0,0,0,0,0,0,
    'Please Select Location First','Not available','Not available','Not available','Not available','Not available','Not available',
    'Not available','Not available','Not available','Not available','Not available','Not available','Not available','Not available',
    'Not available','Not available','Not available','Not available','17.456634553284054','78.37858469200083','Location','country'
];

const fillThePage = (state = initialState, action) => {
    switch (action.type){
        case "POPULATE": return (
            action.payload
        );
        default: return state;
    }
}

export default fillThePage;