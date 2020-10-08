import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { useFetch } from "../../hooks/useFetch";
import { addHistoryItem } from "../../utils/feedHistory";
import FeedSearch from "./FeedSearch";

const setResponse = jest.fn();

const useFetchMock = useFetch as jest.Mock;
jest.mock("../../hooks/useFetch", () => ({ useFetch: jest.fn() }));

jest.mock("../../utils/feedHistory", () => ({
  getHistory: () => [{ title: "Suggestion 1", url: "http://suggestion1.local" }],
  addHistoryItem: jest.fn(),
}));

describe("<FeedSearch>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch with first history item initially", () => {
    useFetchMock.mockReturnValue(null);
    render(<FeedSearch setResponse={setResponse} />);
    expect(useFetchMock).toBeCalledWith(
      "https://api.rss2json.com/v1/api.json?rss_url=http://suggestion1.local"
    );
  });

  it("should fetch with new url on submit", () => {
    useFetchMock.mockReturnValue(null);
    const { getByRole } = render(<FeedSearch setResponse={setResponse} />);
    fireEvent.submit(getByRole("form"), { target: [{ value: "http://test.local" }] });
    expect(useFetchMock).toBeCalledWith(
      "https://api.rss2json.com/v1/api.json?rss_url=http://test.local"
    );
  });

  it("should set response and render loader while loading", () => {
    useFetchMock.mockReturnValue(null);
    const { queryByRole } = render(<FeedSearch setResponse={setResponse} />);
    expect(queryByRole("progressbar")).toBeTruthy();
    expect(setResponse).toBeCalledTimes(1);
    expect(setResponse).toBeCalledWith(null);
  });

  it("should set response and hide loader on error", () => {
    useFetchMock.mockReturnValue({ error: "Custom error" });
    const { queryByRole } = render(<FeedSearch setResponse={setResponse} />);
    expect(queryByRole("progressbar")).toBeNull();
    expect(setResponse).toBeCalledTimes(1);
    expect(setResponse).toBeCalledWith({ error: "Custom error" });
  });

  it("should set response on success response", () => {
    useFetchMock.mockReturnValue({ feed: "mock feed" });
    render(<FeedSearch setResponse={setResponse} />);
    expect(setResponse).toBeCalledTimes(1);
    expect(setResponse).toBeCalledWith({ feed: "mock feed" });
  });

  it("should add feed to history on success response", () => {
    useFetchMock.mockReturnValue({ feed: "mock feed" });
    render(<FeedSearch setResponse={setResponse} />);
    expect(addHistoryItem).toBeCalledWith("mock feed");
  });
});
