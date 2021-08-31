import React, { useEffect } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
} from "@chakra-ui/react";
import useSWR from "swr";
import { SearchIcon } from "@chakra-ui/icons";
import { useAlbum } from "../providers/albumProvider";
import { useRouter } from "next/router";

function Search() {
  const album = useAlbum();
  const router = useRouter();

  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);

  const searchSubmit = () => {
    router.push({
      pathname: "/search",
      query: { input: value },
    });
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13 && value) {
      console.log("ding");
      searchSubmit();
    }
  };

  return (
    <div>
      <Flex
        justifyContent="center"
        alignItems="center"
        w="5xl"
        mx={{ base: "0", md: 10 }}
      >
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="purple.600" />}
            />
            <Input
              onKeyPress={(e) => handleKeypress(e)}
              value={value}
              onChange={handleChange}
              rounded="2xl"
              focusBorderColor="purple.600"
              placeholder="Search for an album"
              _placeholder={{ color: "gray.200" }}
            ></Input>
          </InputGroup>
        </FormControl>
      </Flex>
    </div>
  );
}

export default Search;
