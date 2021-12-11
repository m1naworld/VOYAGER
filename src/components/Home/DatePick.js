import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { Controller } from "react-hook-form";
function DatePick({ control, view, setView, setBirthday }) {
  const [Dvalue, setDvalue] = useState(new Date());
  return view ? (
    <Controller
      control={control}
      name="birth"
      format="YYYY-MM-DD"
      render={({ field: { onChange } }) => (
        <Calendar
          value={Dvalue}
          onChange={(value) => {
            onChange(value);
            setView(!view);
            setDvalue(value);
            setBirthday({
              year: value.getFullYear(),
              month: value.getMonth() + 1,
              day: value.getDate(),
            });
          }}
        />
      )}
    />
  ) : (
    ""
  );
}

export default DatePick;
