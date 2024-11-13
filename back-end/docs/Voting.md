# Voting

*@Thomas*

> Voting contract

This contract is a simple voting system

*This contract is for educational purposes only*

## Methods

### MAX_PROPOSALS

```solidity
function MAX_PROPOSALS() external view returns (uint256)
```

Maximum number of proposals




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### MAX_PROPOSALS_PER_VOTER

```solidity
function MAX_PROPOSALS_PER_VOTER() external view returns (uint256)
```

Maximum number of proposals per voter




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### addProposal

```solidity
function addProposal(string _desc) external nonpayable
```

Add a proposal



#### Parameters

| Name | Type | Description |
|---|---|---|
| _desc | string | The description of the proposal |

### addVoter

```solidity
function addVoter(address _addr) external nonpayable
```

Add a voter



#### Parameters

| Name | Type | Description |
|---|---|---|
| _addr | address | The address of the voter |

### endProposalsRegistering

```solidity
function endProposalsRegistering() external nonpayable
```

End the proposals registering




### endVotingSession

```solidity
function endVotingSession() external nonpayable
```

End the voting session




### getOneProposal

```solidity
function getOneProposal(uint256 _id) external view returns (struct Voting.Proposal)
```

Getter for a proposal



#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The ID of the proposal |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Proposal | The proposal |

### getVoter

```solidity
function getVoter(address _addr) external view returns (struct Voting.Voter)
```

Getter for a voter



#### Parameters

| Name | Type | Description |
|---|---|---|
| _addr | address | The address of the voter |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | Voting.Voter | The voter |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.*


### setVote

```solidity
function setVote(uint256 _id) external nonpayable
```

Set a vote



#### Parameters

| Name | Type | Description |
|---|---|---|
| _id | uint256 | The ID of the proposal |

### startProposalsRegistering

```solidity
function startProposalsRegistering() external nonpayable
```

Start the proposals registering




### startVotingSession

```solidity
function startVotingSession() external nonpayable
```

Start the voting session




### tallyVotes

```solidity
function tallyVotes() external nonpayable
```

Tally the votes, count the votes and set the winning proposal ID

*This function is only callable by the owner, only one time, after the workflow status change to VotesTallied*


### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### winningProposalID

```solidity
function winningProposalID() external view returns (uint256)
```

Winning proposal ID 




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### workflowStatus

```solidity
function workflowStatus() external view returns (enum Voting.WorkflowStatus)
```

Workflow status




#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | enum Voting.WorkflowStatus | undefined |



## Events

### MaxProposalsReachedForUser

```solidity
event MaxProposalsReachedForUser(address voter)
```

Event for maximum proposals reached for a user



#### Parameters

| Name | Type | Description |
|---|---|---|
| voter  | address | undefined |

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### ProposalRegistered

```solidity
event ProposalRegistered(uint256 proposalId)
```

Event for proposal registration



#### Parameters

| Name | Type | Description |
|---|---|---|
| proposalId  | uint256 | undefined |

### Voted

```solidity
event Voted(address voter, uint256 proposalId)
```

Event for vote



#### Parameters

| Name | Type | Description |
|---|---|---|
| voter  | address | undefined |
| proposalId  | uint256 | undefined |

### VoterRegistered

```solidity
event VoterRegistered(address voterAddress)
```

Event for voter registration



#### Parameters

| Name | Type | Description |
|---|---|---|
| voterAddress  | address | undefined |

### WorkflowStatusChange

```solidity
event WorkflowStatusChange(enum Voting.WorkflowStatus previousStatus, enum Voting.WorkflowStatus newStatus)
```

Event for workflow status change



#### Parameters

| Name | Type | Description |
|---|---|---|
| previousStatus  | enum Voting.WorkflowStatus | undefined |
| newStatus  | enum Voting.WorkflowStatus | undefined |



## Errors

### OwnableInvalidOwner

```solidity
error OwnableInvalidOwner(address owner)
```



*The owner is not a valid owner account. (eg. `address(0)`)*

#### Parameters

| Name | Type | Description |
|---|---|---|
| owner | address | undefined |

### OwnableUnauthorizedAccount

```solidity
error OwnableUnauthorizedAccount(address account)
```



*The caller account is not authorized to perform an operation.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| account | address | undefined |


