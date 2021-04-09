import { isValid } from "date-fns";
import { memo } from "react";
import DateTimePicker from "react-datetime-picker";
import { size, styled } from "stitches.config";
import { CalendarBlank } from "phosphor-react";
import { Colors } from "logic/Colors";

type Props = {
  value: Date | null;
  onChange?: (val: Date) => void;
};

export const DateTimeInput = memo<Props>(({ value, onChange }) => {
  const resolvedValue = value === null || !isValid(value) ? undefined : value;

  return (
    <StyledDateTimePicker
      value={resolvedValue}
      format="dd/MM/y HH:mm"
      onChange={onChange}
      clearIcon={null}
      disableClock={true}
      calendarIcon={<CalendarBlank size={size(0, 6)} />}
    />
  );
});

const StyledDateTimePicker: typeof DateTimePicker = styled(DateTimePicker, {
  "& .react-datetime-picker__wrapper": {
    fontHeight: "$10",
    fontFamily: "$spaceGrotesk",
    paddingLeft: "$02",
    paddingTop: "$01",
    paddingBottom: "$01",
    paddingRight: "$02",
    borderWidth: "$small",
    borderColor: Colors.blue(500),
    borderStyle: "solid",
    backgroundColor: Colors.indigo(50),
    borderRadius: "$medium",
  },
  "& .react-datetime-picker__button": {
    padding: 0,
    paddingLeft: "$02",
    paddingRight: "$02",
  },
  "& .react-calendar": {
    borderRadius: "$medium",
    margin: 0,
    border: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    backgroundColor: Colors.white,
    boxShadow: "$overlay",
    padding: "$04",
    marginTop: "$02",
  },
}) as any;
