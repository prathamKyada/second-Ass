// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CharityContract {
    struct Charity {
        string name;
        string description;
        address payable charityAddress;
        uint balance;
        bool isRegistered;
    }
    mapping(address => Charity) public charities;
    mapping(address => uint[]) public donationTimestamps;
    mapping(address => uint[]) public donationAmounts;
    mapping(address => address) public myDonatedCharity;
    event CharityRegistered(address indexed charityAddress, string name, string description);
    event CharityUpdated(address indexed charityAddress, string name, string description);
    event DonationMade(address indexed charityAddress, address indexed donor, uint amount, uint timestamp);
    event FundsTransferred(address indexed charityAddress, uint amount);
    modifier onlyRegisteredCharity() {
        require(charities[msg.sender].isRegistered, "Charity is not registered.");
        _;
    }
    // Register a new charity
    function registerCharity(string memory _name, string memory _description) public {
        require(bytes(_name).length > 0, "Charity name cannot be empty.");
        require(bytes(_description).length > 0, "Charity description cannot be empty.");
        require(!charities[msg.sender].isRegistered, "Charity is already registered.");
        charities[msg.sender] = Charity({
            name: _name,
            description: _description,
            charityAddress: payable(msg.sender),
            balance: 0,
            isRegistered: true
        });
        emit CharityRegistered(msg.sender, _name, _description);
    }
    // Update charity details
    function updateCharityDetails(string memory _name, string memory _description) public onlyRegisteredCharity {
        require(bytes(_name).length > 0, "Charity name cannot be empty.");
        require(bytes(_description).length > 0, "Charity description cannot be empty.");
        charities[msg.sender].name = _name;
        charities[msg.sender].description = _description;
        emit CharityUpdated(msg.sender, _name, _description);
    }
    // Get charity details
    function getCharityDetails(address _charityAddress) public view returns (string memory, string memory, uint, bool) {
        Charity memory charity = charities[_charityAddress];
        return (charity.name, charity.description, charity.balance, charity.isRegistered);
    }
    // Donate to a charity
    function donateToCharity(address _charityAddress) public payable {
        require(charities[_charityAddress].isRegistered, "Charity is not registered.");
        require(msg.value > 0, "Donation amount must be greater than 0.");
        charities[_charityAddress].balance += msg.value;
        donationTimestamps[msg.sender].push(block.timestamp);
        donationAmounts[msg.sender].push(msg.value);
        myDonatedCharity[msg.sender , _charityAddress];
        emit DonationMade(_charityAddress, msg.sender, msg.value, block.timestamp);
    }
    // Transfer funds from charity to its own wallet
    function transferCharityFunds() public onlyRegisteredCharity {
        uint balance = charities[msg.sender].balance;
        require(balance > 0, "No funds available for transfer.");
        charities[msg.sender].balance = 0;
        charities[msg.sender].charityAddress.transfer(balance);
        emit FundsTransferred(msg.sender, balance);
    }
    // Get donation history of a donor
    function getDonationHistory(address _donor) public view returns (uint[] memory, uint[] memory) {
        return (donationTimestamps[_donor], donationAmounts[_donor]);
    }
    // Check if a charity is registered
    function isCharityRegistered(address _charityAddress) public view returns (bool) {
        return charities[_charityAddress].isRegistered;
    }
}