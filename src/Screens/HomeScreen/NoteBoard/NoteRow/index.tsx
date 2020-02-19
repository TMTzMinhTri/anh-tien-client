import * as React from "react";

export const NoteRow: React.SFC<any> = ({ history }) => {
  return <div className='row m-0'>
      <div className="col-4">{history.name}</div>
      <div className="col-4">{history.price}</div>
      <div className="col-4">{history.note}</div>
  </div>;
};
