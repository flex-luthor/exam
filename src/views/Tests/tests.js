import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import PrCard from "./prcards.js";

import { GridList } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { whiteColor } from "assets/jss/material-dashboard-react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import Checkbox from "@material-ui/core/Checkbox";
import firebase from "@firebase/app";
import "@firebase/storage";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";

import Upload from "./upload.js";
import Card from "components/Card/Card.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  label: {
    color: "#aaa",
    textAlign: "center",
    paddingTop: "160px",
    height: "200px",
    border: "3px dashed #ccc",
    borderRadius: "20px"
  },
  fab: {
    zIndex: "3",
    position: "fixed",
    right: "50px",
    bottom: "50px"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: whiteColor,
    padding: 20,
    width: "80%",
    minWidth: "300px",
    maxHeight: "90%",
    borderRadius: "10px"
  },
  prform: {
    margin: "20px 0"
  },
  formelement: {
    marginBottom: "15px"
  },
  formprice: {
    width: "49%",
    marginBottom: "15px"
  },
  formselect: {
    width: "49%",
    marginBottom: "15px",
    marginRight: "2%"
  },
  imagebox: {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  return (
    <div>
      <Switch>
        <Redirect exact from="/admin/tests" to="/admin/tests/home" />
        <Route path="/admin/tests/:id" children={<Child />} />
      </Switch>
    </div>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  const classes = useStyles();
  const [pr, changePr] = React.useState([
    {
      id: "1",
      title: "Algebra Quiz 1",
      description: "Algebra MCQ quiz upto topic 7",
      subject: "maths",
      marks: "25",
      duration: "60",
      taken: false,
      marksObtained: null,
      questions: [
        {
          ques: "20 % of 2 is equal to",
          options: ["20", "4", "0.4", "0.04"],
          correctoption: 1,
          image: null,
          marks: 5
        },
        {
          ques: "Find Angle X",
          options: ["30 deg", "60 deg", "90 deg", "120 deg"],
          correctoption: 1,
          image:
            "https://mindyourdecisions.com/blog/wp-content/uploads/2016/08/hardest-easy-geometry-problem-langleys-adventitious-angles.png",
          marks: 5
        },
        {
          ques: "50 % of 200 is equal to",
          options: ["20", "40", "55", "100"],
          correctoption: 4,
          image: null,
          marks: 5
        },
        {
          ques: "Find Angle X",
          options: ["30 deg", "60 deg", "90 deg", "120 deg"],
          correctoption: 1,
          image: "https://i.stack.imgur.com/WQlAr.gif",
          marks: 5
        },
        {
          ques: "20 % of 2 is equal to",
          options: ["20", "4", "0.4", "0.04"],
          correctoption: 1,
          image: null,
          marks: 5
        }
      ]
    }
  ]);
  const activeTest = pr.find(x => x.id === id);

  const [value, setValue] = React.useState([]);

  const handleChange = event => {
    let newValue = [...value];
    newValue[event.target.name] = event.target.value;
    setValue(newValue);
    console.log(value);
  };

  const handleSubmit = () => {
    let marks = 0;
    console.log(activeTest.questions.length);
    for (let index = 0; index < activeTest.questions.length; index++) {
      if (activeTest.questions[index].correctoption == value[index]) {
        marks += activeTest.questions[index].marks;
      }
    }
    // changePr({...pr, taken: true, marksObtained: marks });
    alert(
      "Test Submitted Successfully. Marks Obtained : " +
        marks +
        "/" +
        activeTest.marks
    );
    return <Redirect to="/admin/tests/home" />;
  };

  // console.log(activeTest);
  if (id === "home") {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridList>
            {pr.map(el => {
              return (
                // eslint-disable-next-line react/jsx-key
                <PrCard
                  id={el.id}
                  title={el.title}
                  description={el.description}
                  duration={el.duration}
                  marks={el.marks}
                  marksObtained={el.marksObtained}
                  taken={el.taken}
                  subject={el.subject}
                  questions={el.questions}
                />
              );
            })}
          </GridList>
        </GridItem>
      </GridContainer>
    );
  } else
    return (
      <div>
        <h3>{activeTest.title}</h3>
        <div>
          {activeTest.questions.map(el => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Card
                style={{ padding: "0 20px", margin: "50px 0", width: "95%" }}
              >
                <h5>Question No. {activeTest.questions.indexOf(el) + 1}</h5>
                <p style={{ fontWeight: "600" }}>{el.ques} :</p>
                {el.image !== null ? (
                  <img style={{ maxWidth: "400px" }} src={el.image} />
                ) : null}
                <FormControl component="fieldset">
                  <FormLabel>Options :</FormLabel>
                  <RadioGroup
                    aria-label="options"
                    name={activeTest.questions.indexOf(el)}
                    value={parseInt(
                      value[activeTest.questions.indexOf(el)],
                      10
                    )}
                    onChange={handleChange}
                  >
                    {el.options.map(opt => {
                      return (
                        <FormControlLabel
                          value={el.options.indexOf(opt) + 1}
                          control={<Radio />}
                          label={opt}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </Card>
            );
          })}
        </div>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    );
}
