import React, { useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Controller } from "react-hook-form";
function DatePick({ control, view, setView, setBirthday }) {
  // const [Dvalue, setDvalue] = useState(new Date());
  return view ? (
    <Controller
      control={control}
      name="birthday"
      format="YYYY-MM-DD"
      render={({ field: { onChange } }) => (
        <Calendar
          data={new Date()}
          onChange={(value) => {
            onChange(value);
            // setDvalue(value);
            setBirthday({
              year: value.getFullYear(),
              month: value.getMonth() + 1,
              day: value.getDate(),
            });
            setView(!view);
          }}
          scroll={{ enabled: true }}
          // value={Dvalue}
          // onClickDay={(value) =>
          //   setBirthday({
          //     year: value.getFullYear(),
          //     month: value.getMonth() + 1,
          //     day: value.getDate(),
          //   })
          // }
          // onChange={(value) => {
          //   onChange(value);
          //   setView(!view);
          //   setDvalue(value);
          //   setBirthday({
          //     year: value.getFullYear(),
          //     month: value.getMonth() + 1,
          //     day: value.getDate(),
          //   });
          // }}
        />
      )}
    />
  ) : (
    ""
  );
}

export default DatePick;
