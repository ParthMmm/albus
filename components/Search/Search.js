import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useAlbum } from "../../providers/albumProvider";

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
        w={{ sm: "20rem", md: "36rem", lg: "48rem" }}
        // mx={{ sm: 10, md: 10 }}
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
              color="white"
            ></Input>
          </InputGroup>
        </FormControl>
      </Flex>
    </div>
  );
}

export default Search;
