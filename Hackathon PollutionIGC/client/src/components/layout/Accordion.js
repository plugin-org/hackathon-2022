import React from 'react';


function Accordion(){
  return (
      <div>
    <div className="d-sm-flex justify-content-between align-items-center mb-4 mt-4">
        <h3 className="text-dark mb-0">Blockchain Functionality</h3>
    </div>
    <div className="shadow-small border-start-primary mb-4 mt-4">
        
            {/* <Dropdown /> */}
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                            Show Data
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body bg-light">
                        <form>
                            <div className="row mb-2">
                                <div className="col-12"><label className="form-label"><b>Request Contract</b></label><input type="text" className="form-control" required /></div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12"><label className="form-label"><b>ABI*</b></label><textarea className="form-control" aria-label="With textarea"></textarea></div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-12 col-md-6"><label className="form-label"><b>Symbol</b></label><input type="text" className="form-control" required /></div>
                                <div className="col-12 col-md-6"><label className="form-label"><b>End Point</b></label><input type="text" className="form-control" required /></div>
                            </div>
                            <div className="row">
                                <div className="col"><button className="btn btn-primary col-12" type="button">Show</button></div>
                                <div className="col"><button className="btn btn-outline-primary col-12" type="button">Clear</button></div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Deploy Your Contract
                    </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body bg-light">
                        <form>
                            <div className="row mb-2">
                                <div className="col-12"><label className="form-label"><b>Smart Contract</b></label><textarea className="form-control" aria-label="With textarea"></textarea></div>
                            </div>
                            <div className="row">
                                <div className="col"><button className="btn btn-primary col-12" type="button">Compile</button></div>
                                <div className="col"><button className="btn btn-outline-primary col-12" type="button">Deploy</button></div>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Push Data
                    </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-light">
                            <form>
                                <div className="row mb-2">
                                    <div className="col-12"><label className="form-label"><b>Contract Address</b></label><input type="text" className="form-control" required /></div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-12"><label className="form-label"><b>ABI*</b></label><textarea className="form-control" aria-label="With textarea"></textarea></div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label"><b>Env Check</b></label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label"><b>End Point</b></label>
                                        <select className="form-select" aria-label="Default select example">
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12 col-md-6"><label className="form-label"><b>Oracle Address</b></label><input type="text" className="form-control" required /></div>
                                    <div className="col-12 col-md-6"><label className="form-label"><b>Job Id</b></label><input type="text" className="form-control" required /></div>
                                </div>
                                <div className="row">
                                    <div className="col"><button className="btn btn-primary col-12" type="button">Submit</button></div>
                                    <div className="col"><button className="btn btn-outline-primary col-12" type="button">Clear</button></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </div>
  )
}

export default Accordion;