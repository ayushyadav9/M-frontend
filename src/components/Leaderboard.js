import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

export const Leaderboard = ({ setisLeaderboardOpen }) => {

    const [rank, setRank] = useState([]);

    useEffect(() => {
        fetch("https://myntrah-backend.herokuapp.com/getUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                    if (result.success) {
                        setRank(result.user)
                    } else {
                        console.log(result.message)
                    }
                },
                (error) => {
                    console.log(error)
                }
            );
        // eslint-disable-next-line
    }, []);

    const currentUserId = JSON.parse(localStorage.getItem("userInfo")).data.user._id;

    useEffect(() => {
        console.log(currentUserId);

        const anchor = document.querySelector(`#user_${currentUserId}`);
        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [currentUserId]);

    return (

        <PopupContainer>
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={() => {
                        setisLeaderboardOpen((prev) => {
                            return !prev;
                        });
                    }}>
                        x
                    </span>


                    <TableContainer component={Paper}>
                        <Table
                            sx={{
                                minWidth: 250,
                                minHeight: 0,
                                "& .MuiTableCell-head": {
                                    fontWeight: 700,
                                },
                            }}
                            stickyHeader
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Rank</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Score</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rank
                                    ? rank.map((row, index) => (
                                        <TableRow
                                            key={index + 1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            selected={row._id === currentUserId} // Change logic to equate row.user-id to current user
                                            id={`user_${row._id}`}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row._id === currentUserId ? <strong>{index + 1}</strong> : index + 1}
                                            </TableCell>
                                            <TableCell align="center">{row._id === currentUserId ? <strong>{row.name}</strong> : row.name}</TableCell>
                                            <TableCell align="center">{row._id === currentUserId ? <strong>{Math.round(row.score)}</strong> : Math.round(row.score)}</TableCell>
                                        </TableRow>
                                    ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </PopupContainer>

    );
}

const PopupContainer = styled.div`
  .popup-box {
    z-index: 1;
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .box {
    position: relative;
    width: 70%;
    margin: 0 auto;
    height: auto;
    max-height: 85vh;
    margin-top: calc(100vh - 85vh - 10px);
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
  }

  .close-icon {
    content: "x";
    cursor: pointer;
    position: fixed;
    right: calc(15% - 30px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }
`;
