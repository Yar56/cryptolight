import IconAlert from "../../app/iconAlert.svg";
import React, {useEffect, useState} from "react";
import testApi from "../../api/baseAction";
import { Box } from "@chakra-ui/react"

const MainPage = () => {
	const [state, setState] = useState<number>(0);
	const handle = () => {

		setState(prevState => prevState + 1)
	}

	useEffect(() => {
		testApi().then((res) => {
			console.log(res)
		})
	}, [])
	return <div>

		<h1 onClick={handle}>
			go +1
		</h1>
		<div className={'class'}>123</div>
		<div>state = {state}</div>
		<Box m={2}>Tomato</Box>
		<Box maxW="960px" mx="auto">Tomato 2</Box>
		<IconAlert />
	</div>;
};

export default MainPage;
