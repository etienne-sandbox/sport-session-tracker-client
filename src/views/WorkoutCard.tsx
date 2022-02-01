import { DateTime } from "components/DateTime";
import { Distance } from "components/Distance";
import { Duration } from "components/Duration";
import { Spacer } from "components/Spacer";
import { Speed } from "components/Speed";
import { Colors } from "logic/Colors";
import {
  CalendarBlank,
  CaretCircleDoubleRight,
  MapPin,
  Path,
  Timer,
} from "phosphor-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { size, styled } from "stitches.config";

type WorkoutCardProps = {
  distance: number;
  duration: number;
  userDisplayName: string;
  username: string;
  place: string;
  speed: number;
  placeName: string;
  date: string;
};

const ICON_SIZE = size(0, 6);
const ICON_SHADE = 250;

export const WorkoutCard = memo<WorkoutCardProps>(
  ({
    distance,
    duration,
    speed,
    place,
    placeName,
    userDisplayName,
    username,
    date,
  }) => {
    return (
      <CardWrapper>
        <Header>
          <NameLink to={`/user/${username}`}>{userDisplayName}</NameLink>
        </Header>
        <Stats>
          <StatItem>
            <StatIcon style={{ background: Colors.green(ICON_SHADE) }}>
              <Path size={ICON_SIZE} />
            </StatIcon>
            <Spacer horizontal={4} />
            <Distance distance={distance} />
          </StatItem>
          <Spacer horizontal={4} />
          <StatItem>
            <StatIcon style={{ background: Colors.blue(ICON_SHADE) }}>
              <Timer size={ICON_SIZE} />
            </StatIcon>
            <Spacer horizontal={4} />
            <Duration duration={duration} />
          </StatItem>
          <Spacer horizontal={4} />
          <StatItem>
            <StatIcon style={{ background: Colors.cyan(ICON_SHADE) }}>
              <CaretCircleDoubleRight size={ICON_SIZE} />
            </StatIcon>
            <Spacer horizontal={4} />
            <Speed speed={speed} />
          </StatItem>
        </Stats>
        <Stats>
          <StatItem>
            <StatIcon style={{ background: Colors.indigo(ICON_SHADE) }}>
              <CalendarBlank size={ICON_SIZE} />
            </StatIcon>
            <Spacer horizontal={4} />
            <DateTime datetime={date} />
          </StatItem>
        </Stats>
        <Stats>
          <StatItem>
            <StatIcon style={{ background: Colors.pink(ICON_SHADE) }}>
              <MapPin size={ICON_SIZE} />
            </StatIcon>
            <Spacer horizontal={4} />
            <PlaceLink to={`/place/${place}`}>{placeName}</PlaceLink>
          </StatItem>
        </Stats>
      </CardWrapper>
    );
  }
);

const CardWrapper = styled("div", {
  backgroundColor: Colors.indigo(50),
  borderRadius: "$medium",
  minHeight: "$20",
});

const Header = styled("div", {
  paddingTop: "$02",
  paddingLeft: "$04",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: "$02",
});

const NameLink = styled(Link, {
  fontHeight: "$13",
  fontWeight: "$700",
  textDecoration: "none",
  color: Colors.blueGrey(900),
  "&:hover": {
    textDecoration: "underline",
  },
});

const PlaceLink = styled(Link, {
  fontHeight: "$12",
  fontWeight: "$500",
  textDecoration: "none",
  color: Colors.blueGrey(900),
  wordBreak: "keep-all",
  whiteSpace: "nowrap",
  "&:hover": {
    textDecoration: "underline",
  },
});

const Stats = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "$04",
  paddingTop: 0,
  paddingBottom: 0,
  flexWrap: "wrap",
});

const StatItem = styled("div", {
  minWidth: 150,
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  color: Colors.blueGrey(900),
  wordBreak: "keep-all",
  marginRight: "$06",
  marginBottom: "$04",
});

const StatIcon = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$big",
  color: Colors.white,
  padding: "$02",
});
