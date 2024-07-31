"use client"
import { motion, HTMLMotionProps } from "framer-motion";
import { Component } from "react";

interface CustomMotionDivProps extends HTMLMotionProps<"div"> {
  initial?: any
}

export default class CustomMotionDiv extends Component<CustomMotionDivProps> {
  render() {
    return <motion.div  {...this.props}>{this.props.children}</motion.div>;
  }
}